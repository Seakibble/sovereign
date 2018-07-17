let version = "Pre-alpha v0.70";

let game = StartScreen();

// Input
document.onkeypress = function (e) {
    e = e || window.event;
    let key = String.fromCharCode(e.keyCode);

    game = game.input(key);
};


// Set the canvas size, and add the listener so it resizes properly later
// Needs to be done in this roundabout way because feeding the screen.resizeCanvas
// function straight into the listener causes the 'this' context to get messed up :(
function resizeCanvas() {
    game.resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();