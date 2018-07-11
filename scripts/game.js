/**
 * The main game.
 */

let Game = function () {
    let game = {
        world: null,
        frame: [],
        frameX: 59,
        frameY: 29,
        player: null,
        turn: 1,
        gameScreen: Screen(),
        logStack: [],
        logHistory: [],
        init: function () {
            this.world = WorldGen.makeCaves(100, 100);
            this.player = this.world.getPlayer();

            // initialize frames
            for (let i = 0; i < this.frameX; i++) {
                this.frame.push([]);
            }

            this.log("Welcome to Sovereign!");

            this.getFrame();
        },
        update: function (key) {
            if (key != "") {
                if (this.logStack.length === 0) {
                    this.world.update(key);
                }
                this.getFrame();
                this.gameScreen.draw();
            }
        },
        getFrame: function () {
            // Scrolling
            let x = this.player.x - Math.floor(this.frameX / 2);
            let quadX = Math.floor(this.frameX / 4);
            x = Math.floor(x / (quadX * 2)) * quadX * 2 + quadX;
            if (x < 0) x = 0;
            if (x > this.world.width - this.frameX) x = this.world.width - this.frameX;

            let y = this.player.y - Math.floor(this.frameY / 2);
            let quadY = Math.floor(this.frameY / 4);
            y = Math.floor(y / (quadY * 2)) * quadY * 2 + quadY;
            if (y < 0) y = 0;
            if (y > this.world.height - this.frameY) y = this.world.height - this.frameY;

            // Terrain, Creatures, Items
            for (let i = 0; i < this.frameX; i++) {
                for (let j = 0; j < this.frameY; j++) {
                    this.frame[i][j] = this.world.getCreature(i + x, j + y) || this.world.getItem(i + x, j + y) || this.world.getTile(i + x, j + y);
                }
            }
            
            // Player
            this.frame[this.player.x - x][this.player.y - y] = this.player;
        },
        log: function (message) {
            this.logStack.push(message);
        },
        getNextMessage: function () {
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
        },
        gameOver: function () {
            this.init();
        }
    };
    game.init();
    return game;
}
