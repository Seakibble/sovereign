/**
 * The UI and Input
 */

let game = Game();


// Resize the canvas to match its container size
function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
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

    window.requestAnimationFrame(draw);
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
    ctx.font = "18px Lucida Console";
    ctx.fillStyle = colours['grey'];
    ctx.fillText("By Max Leeming", 30, 75);

    // Stats
    ctx.fillStyle = colours['lightGrey'];

    let textList = [];
    textList.push("Name:   " + game.player.name);
    textList.push("Race:   " + game.player.race);
    textList.push("Class:  " + game.player.class);
    textList.push("");
    textList.push("Max HP: " + game.player.mhp);
    textList.push("Cur HP: " + game.player.chp);
    textList.push("");
    textList.push("STR:    " + game.player.printStat("STR"));
    textList.push("DEX:    " + game.player.printStat("DEX"));
    textList.push("CON:    " + game.player.printStat("CON"));
    textList.push("INT:    " + game.player.printStat("INT"));
    textList.push("WIS:    " + game.player.printStat("WIS"));
    textList.push("CHA:    " + game.player.printStat("CHA"));
    textList.push("");
    textList.push("Location: " + game.player.x + ", " + game.player.y);
    textList.push("Turn: " + game.turn);

    for (let i = 0; i < textList.length; i++) {
        ctx.fillText(textList[i], 20, 25 * i + 125);
    }

    // The frame
    ctx.font = "25px Lucida Console";
    for (let i = 0; i < game.frameX; i++) {
        for (let j = 0; j < game.frameY; j++) {
            ctx.fillStyle = colours[game.frame[i][j].colour];
            ctx.fillText(game.frame[i][j].img, 18 * i + 400, 25 * j + 50);
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