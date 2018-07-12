/**
 * The UI
 */
const Screen = function () {
    let screen = {
        container: document.getElementById('container'),
        canvas: document.getElementById('canvas'),
        ctx: this.canvas.getContext('2d'),
        font: " Lucida Console",
        clear: function () {
            // Clear previous frame
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.fillStyle = colours['darkGrey'];
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        },
        resizeCanvas: function () {
            // Resize the canvas to match its container size
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
            this.draw();
        },
        draw: function () {
            // Behavior to be added by subclasses
        },
        input: function () {
            // Behavior to be added by subclasses
        }
    };
    

    return screen;
}