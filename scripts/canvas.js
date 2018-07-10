/**
 * The UI and Input
 */

let version = "Pre-alpha v0.30";

let game = Game();

// Resize the canvas to match its container size
function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    window.requestAnimationFrame(draw);
}

var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set the canvas size, and add the listener so it resizes properly later
resizeCanvas()
window.addEventListener('resize', resizeCanvas);

////////////////////////////////////////////////////////////////////////////////////

function init() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(50,50,50)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    // Clear previous frame
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = colours['darkGrey'];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.font = "30px Lucida Console";
    ctx.fillStyle = colours['red'];
    ctx.fillText("Sovereign", 20, 50);

    // Author
    ctx.font = "16px Lucida Console";
    ctx.fillStyle = colours['grey'];
    ctx.fillText("By Max Leeming | " + version, 30, 75);

    // Stats
    ctx.fillStyle = colours['lightGrey'];

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
        ctx.fillText(textList[i], 20, 20 * i + 125);
    }

    // Message Log
    let message = ">> " + game.getNextMessage();
    if (game.logStack.length > 0) {
        message += "  --MORE--"
    }
    ctx.fillText(message, 400, 75);

    // The frame
    ctx.font = "24px Lucida Console";
    for (let i = 0; i < game.frameX; i++) {
        for (let j = 0; j < game.frameY; j++) {
            ctx.fillStyle = colours[game.frame[i][j].colour];
            ctx.fillText(game.frame[i][j].glyph, 18 * i + 400, 25 * j + 125);
        }
    }
}

document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    let key = String.fromCharCode(e.keyCode);
    if (key === 'undefined') {
        key = "";
    }
    game.update(key);
    window.requestAnimationFrame(draw);
};

init();