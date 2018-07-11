/**
 * The UI
 */
const Screen = function () {
    let screen = {
        container: null,
        canvas: null,
        ctx: null,
        font: " Lucida Console",
        clear: function () {
            // Clear previous frame
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.fillStyle = colours['darkGrey'];
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        },
        draw: function () {
            this.clear();

            // Title
            this.ctx.font = "30px" + this.font;
            this.ctx.fillStyle = colours['red'];
            this.ctx.fillText("Sovereign", 20, 50);

            // Author
            this.ctx.font = "16px" + this.font;
            this.ctx.fillStyle = colours['grey'];
            this.ctx.fillText("By Max Leeming | " + version, 30, 75);

            // Stats
            this.ctx.fillStyle = colours['lightGrey'];

            let textList = [];
            textList.push("Name:            " + game.player.name);
            textList.push("Race:            " + game.player.race);
            textList.push("Class:           " + game.player.class + " (" + game.player.level + ")");
            textList.push("");
            textList.push("Experience:      " + game.player.exp + " / " + game.player.expToLevel);
            textList.push("");
            textList.push("Hit Points:      " + game.player.chp + "/" + game.player.mhp);
            textList.push("Armour Class:    " + game.player.ac);
            textList.push("");
            textList.push("Proficiency:     +" + game.player.proficiency);
            textList.push("");
            textList.push("Strength:        " + game.player.printStat("STR"));
            textList.push("Dexterity:       " + game.player.printStat("DEX"));
            textList.push("Constitution:    " + game.player.printStat("CON"));
            textList.push("Intelligence:    " + game.player.printStat("INT"));
            textList.push("Wisdom:          " + game.player.printStat("WIS"));
            textList.push("Charisma:        " + game.player.printStat("CHA"));
            textList.push("");
            textList.push("Gold:            " + game.player.gold);
            textList.push("");
            let weaponDetails = game.player.getWeaponDetails();

            let attackPositive = weaponDetails.attackBonus >= 0 ? "+" : "";

            let damagePositive = weaponDetails.damageBonus > 0 ? "+" : "";
            weaponDetails.damageBonus = weaponDetails.damageBonus === 0 ? "" : weaponDetails.damageBonus;

            textList.push("Wielding: " + game.player.weapon.name);
            let weaponMessage = attackPositive + weaponDetails.attackBonus;
            textList.push(" " + weaponMessage + " to Hit");
            weaponMessage = game.player.weapon.damageDice + damagePositive + weaponDetails.damageBonus;

            textList.push(" " + weaponMessage + " Damage");
            textList.push("");
            textList.push("");
            textList.push("Location:        " + game.player.x + ", " + game.player.y);
            textList.push("Turn:            " + game.turn);

            for (let i = 0; i < textList.length; i++) {
                this.ctx.fillText(textList[i], 20, 20 * i + 125);
            }

            // Message Log
            let message = ">> " + game.getNextMessage();
            if (game.logStack.length > 0) {
                message += "  --MORE--"
            }
            this.ctx.fillText(message, 400, 75);

            // The frame
            this.ctx.font = "24px" + this.font;
            for (let i = 0; i < game.frameX; i++) {
                for (let j = 0; j < game.frameY; j++) {
                    this.ctx.fillStyle = colours[game.frame[i][j].colour];
                    this.ctx.fillText(game.frame[i][j].glyph, 18 * i + 400, 25 * j + 125);
                }
            }
        },
        resizeCanvas: function () {
            // Resize the canvas to match its container size
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
            this.draw();
        }
    };

    screen.container = document.getElementById('container');
    screen.canvas = document.getElementById('canvas');
    screen.ctx = canvas.getContext('2d');

    return screen;
}