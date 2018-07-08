/**
 * The main game.
 */

let Game = function () {
    let game = {
        world: [],
        worldX: 100,
        worldY: 100,
        frame: [],
        frameX: 59,
        frameY: 29,
        player: Player(),
        turn: 0,
        init: function () {
            this.player.x = randomInt(0, this.worldX - 1);
            this.player.y = randomInt(0, this.worldY - 1);

            // initialize world
            for (let i = 0; i < this.worldX; i++) {
                this.world.push([]);
                for (let j = 0; j < this.worldY; j++) {
                    let stack = [Thing()];

                    if (i === this.player.x && j === this.player.y) {
                        stack.push(this.player);
                    } else {
                        if (randomInt(0, 100) > 95 || (
                            i === 0 || i === this.worldX - 1 ||
                            j === 0 || j === this.worldY - 1
                        )) {
                            stack = [Wall()];
                        }
                    }

                    this.world[i].push(stack);
                }
            }

            // initialize frame
            for (let i = 0; i < this.frameX; i++) {
                this.frame.push([]);
                for (let j = 0; j < this.frameY; j++) {
                    this.frame[i].push(null);
                }
            }

            this.getFrame();
        },
        update: function (key) {
            // key = Keys.getKeysFromCode(key);
            if (key != "") {
                this.command(key);
            }

            this.getFrame();
        },
        command: function (key) {
            console.log(key);
            switch (key) {
                case 'a': this.cmdMove(["left"]);
                    break;
                case 'd': this.cmdMove(["up"]);
                    break;
                case 's': this.cmdMove(["down"]);
                    break;
                case 'h': this.cmdMove(["right"]);
                    break;
                case '1': this.cmdMove(["left", "down"]);
                    break;
                case '2': this.cmdMove(["down"]);
                    break;
                case '3': this.cmdMove(["right", "down"]);
                    break;
                case '4': this.cmdMove(["left"]);
                    break;
                case '6': this.cmdMove(["right"]);
                    break;
                case '7': this.cmdMove(["up", "left"]);
                    break;
                case '8': this.cmdMove(["up"]);
                    break;
                case '9': this.cmdMove(["up", "right"]);
                    break;
            }
        },
        cmdMove: function (direction) {
            let x = 0;
            let y = 0;
            for (let i = 0; i < direction.length; i++) {
                switch (direction[i]) {
                    case "left":
                        x--;
                        break;
                    case "up":
                        y--;
                        break;
                    case "right":
                        x++;
                        break;
                    case "down":
                        y++;
                        break;
                }
            }

            let newLoc = this.world[this.player.x + x][this.player.y + y];

            if (newLoc !== 'null' && newLoc[0].isPassable === true && newLoc[newLoc.length - 1].isPassable === true) {
                this.world[this.player.x][this.player.y].pop();
                newLoc.push(this.player);
                this.player.x += x;
                this.player.y += y;
            }
        },
        getFrame: function () {
            let x = this.player.x - Math.floor(this.frameX / 2);
            let quadX = Math.floor(this.frameX / 4);
            x = Math.floor(x / (quadX * 2)) * quadX * 2 + quadX;
            if (x < 0) x = 0;
            if (x > this.worldX - this.frameX) x = this.worldX - this.frameX;

            let y = this.player.y - Math.floor(this.frameY / 2);
            let quadY = Math.floor(this.frameY / 4);
            y = Math.floor(y / (quadY * 2)) * quadY * 2 + quadY;
            if (y < 0) y = 0;
            if (y > this.worldY - this.frameY) y = this.worldY - this.frameY;

            for (let i = 0; i < this.frameX; i++) {
                for (let j = 0; j < this.frameY; j++) {
                    this.frame[i][j] = this.world[i + x][j + y][this.world[i + x][j + y].length - 1];
                }
            }
            this.turn++;
        }
    };
    game.init();
    return game;
}