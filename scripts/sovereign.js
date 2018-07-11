let version = "Pre-alpha v0.40";

let game = Game();

// Input
document.onkeypress = function (e) {
    e = e || window.event;
    let key = String.fromCharCode(e.keyCode);
    if (key === 'undefined') {
        key = "";
    }
    game.update(key);
};


// Set the canvas size, and add the listener so it resizes properly later
// Needs to be done in this roundabout way because feeding the screen.resizeCanvas
// function straight into the listener causes the 'this' context to get messed up :(
function resizeCanvas() {
    game.gameScreen.resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();