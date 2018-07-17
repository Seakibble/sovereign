/**
 * The UI
 */
const GameScreen = function () {
    let screen = Screen();
    
    screen.world = null;
    screen.frame = [];
    screen.player = null;
    screen.targetX = null;
    screen.targetY = null;
    screen.logStack = [];
    screen.logHistory = [];
    
    screen.log = function (message) {
        this.logStack.push(message);
    };
    screen.getNextMessage = function () {
        let message = "";
        if (this.logStack.length > 0) {
            message = this.logStack.shift();

            let i = 0;
            while (this.logHistory[i] === message) i++;

            this.logHistory.unshift(message);

            if (i > 0) {
                message += " (x" + (i + 1) + ")";
            }

            if (this.logHistory.length > 50) {
                this.logHistory.pop();
            }
        }
        return message;
    }

    screen.input = function (_key) {
        if ((_key === "Q" && this.logHistory[0].includes("Really quit? (Press Q again to confirm)")) 
        || this.logHistory[0].includes("You have been slain")) {
            return LoseScreen();
        }

        if (_key === "Q") {
            this.log("Really quit? (Press Q again to confirm)");
        }
        return this.updateWorld(_key);
    };

    screen.updateWorld = function (_key) {
        if (this.logStack.length === 0) {
            if (this.player.chp < 1) {
                return LoseScreen();
            } else {
                this.world.update(_key);
            }
        }

        this.draw();

        return this;
    }

    screen.getScrollX = function () {
        if (isNull(this.playerX) || this.playerX < this.player.x - this.world.screenWidth / 6 || this.playerX > this.player.x + this.world.screenWidth / 6) {
            this.playerX = this.player.x;
        }

        return Math.max(0, Math.min(this.playerX - this.world.screenWidth / 2, this.world.width - this.world.screenWidth));
    }
	
	screen.getScrollY = function () {
        if (isNull(this.playerY) || this.playerY < this.player.y - this.world.screenHeight / 4 || this.playerY > this.player.y + this.world.screenHeight / 4) {
            this.playerY = this.player.y;
        }

        return Math.max(0, Math.min(this.playerY - this.world.screenHeight / 2, this.world.height - this.world.screenHeight));
    }

    // Drawing the world and stat block
    screen.draw = function () {
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
        textList.push("Name:            " + this.player.name);
        textList.push("Race:            " + this.player.race);
        textList.push("Class:           " + this.player.class + " (" + this.player.level + ")");
        textList.push("");
        textList.push("Experience:      " + this.player.exp + " / " + this.player.expToLevel);
        textList.push("");
        textList.push("Hit Points:      " + this.player.chp + " / " + this.player.mhp);
        textList.push("Armour Class:    " + this.player.ac);
        textList.push("");
        textList.push("Proficiency:     +" + this.player.proficiency);
        textList.push("");
        textList.push("Strength:        " + this.player.printStat("STR"));
        textList.push("Dexterity:       " + this.player.printStat("DEX"));
        textList.push("Constitution:    " + this.player.printStat("CON"));
        textList.push("Intelligence:    " + this.player.printStat("INT"));
        textList.push("Wisdom:          " + this.player.printStat("WIS"));
        textList.push("Charisma:        " + this.player.printStat("CHA"));
        textList.push("");
        textList.push("Gold:            " + this.player.gold);
        textList.push("");
        let weaponDetails = this.player.getWeaponDetails();

        let attackPositive = weaponDetails.attackBonus >= 0 ? "+" : "";

        let damagePositive = weaponDetails.damageBonus > 0 ? "+" : "";
        weaponDetails.damageBonus = weaponDetails.damageBonus === 0 ? "" : weaponDetails.damageBonus;

        textList.push("Wielding: " + this.player.weapon.name);
        let weaponMessage = attackPositive + weaponDetails.attackBonus;
        textList.push(" " + weaponMessage + " to Hit");
        weaponMessage = this.player.weapon.damageDice + damagePositive + weaponDetails.damageBonus;

        textList.push(" " + weaponMessage + " Damage");
        textList.push("");
        textList.push("");
        textList.push("Location:        " + this.player.x + ", " + this.player.y);
        textList.push("Turn:            " + this.player.turn);

        for (let i = 0; i < textList.length; i++) {
            this.ctx.fillText(textList[i], 20, 20 * i + 125);
        }

        // Message Log
        let message = ">> " + this.getNextMessage();
        if (this.logStack.length > 0) {
            message += "  --MORE--"
        }
        this.ctx.fillText(message, 400, 75);

        this.player.ai.fov.update();
    
        let left = this.getScrollX();
        let top = this.getScrollY();

        // Generate the frame containing terrain, creatures, and items
        for (let i = 0; i < this.world.screenWidth; i++) {
            for (let j = 0; j < this.world.screenHeight; j++) {
                let hereX = left + i;
                let hereY = top + j;

                if (this.player.canSee(hereX, hereY)) {    
                    this.frame[i][j] = getRenderable(this.world.getCreature(hereX, hereY) || this.world.getItem(hereX, hereY) || this.world.getTile(hereX, hereY));
                } else {
                    this.frame[i][j] = getRenderable(this.player.ai.fov.getTile(hereX, hereY));
                    this.frame[i][j].colour = "dullGrey";
                }
            }
        }
            
        // Player
        this.frame[this.player.x - left][this.player.y - top] = this.player;

        // The frame
        this.ctx.font = "24px" + this.font;
        for (let i = 0; i < this.world.screenWidth; i++) {
            for (let j = 0; j < this.world.screenHeight; j++) {
                if (!isNull(this.frame[i][j])) {
                    this.ctx.fillStyle = colours[this.frame[i][j].colour];
                    this.ctx.fillText(this.frame[i][j].glyph, 18 * i + 400, 25 * j + 125);
                }
            }
        }
    };

    // Initialization
    screen.world = WorldGen.makeCaves(200, 160, 30);
    // screen.world = WorldGen.makeTestRoom(60, 30);
    screen.player = screen.world.player;

    // initialize frame
    for (let i = 0; i < screen.world.screenWidth; i++) {
        screen.frame.push([]);
    }

    screen.log("Welcome to Sovereign!");

    screen.draw();
    return screen;
}