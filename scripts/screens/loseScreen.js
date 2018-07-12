/**
 * The UI
 */
const LoseScreen = function () {
    let screen = Screen();
        
    screen.draw = function () {
        this.clear();

        // Title
        this.ctx.font = "60px" + this.font;
        this.ctx.fillStyle = colours['red'];
        this.ctx.fillText("Game Over", 600, 400);

        // Author
        this.ctx.font = "16px" + this.font;
        this.ctx.fillStyle = colours['grey'];
        this.ctx.fillText("By Max Leeming | " + version, 610, 440);


        this.ctx.fillStyle = colours['lightGrey'];
        this.ctx.fillText("-- Press any key to continue --", 615, 600);
    };

    screen.input = function (_key) {
        
        if (_key) {
            return StartScreen();
        }

        this.draw();
        return this;
    };

    screen.draw();
    return screen;
}