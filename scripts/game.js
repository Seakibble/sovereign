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
        turn: 1,
        logStack: [],
        logHistory: [],
        init: function () {
            this.player.location.x = randomInt(1, this.worldX - 2);
            this.player.location.y = randomInt(1, this.worldY - 2);

            // initialize world
            for (let i = 0; i < this.worldX; i++) {
                this.world.push([]);
                for (let j = 0; j < this.worldY; j++) {
                    let tile = Tile();

                    if (i === this.player.location.x && j === this.player.location.y) {
                        tile.creature = this.player;
                    } else {

                        let terrainChance = rollDice("d1000");
                        if (terrainChance > 950 || (
                            i === 0 || i === this.worldX - 1 ||
                            j === 0 || j === this.worldY - 1
                        )) {
                            tile.terrain = Wall();
                        } else {
                            let creatureChance = rollDice("d1000");
                            if (creatureChance > 995) {
                                tile.creature = Creature(i, j);
                            }
                        }
                    }
                    this.world[i].push(tile);
                }
            }

            // initialize frame
            for (let i = 0; i < this.frameX; i++) {
                this.frame.push([]);
                for (let j = 0; j < this.frameY; j++) {
                    this.frame[i].push(null);
                }
            }

            this.log("Welcome to Sovereign! Enjoy your stay.");

            this.getFrame();
        },
        update: function (key) {
            // key = Keys.getKeysFromCode(key);
            if (key != "") {
                if (this.logStack.length === 0) {
                    this.command(key);
                    this.player.update();
                }
                this.getFrame();
            }
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
            this.turn++;
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

            let newLoc = this.world[this.player.location.x + x][this.player.location.y + y];

            if (!isNull(newLoc) && newLoc.terrain.isPassable === true) {
                if (isNull(newLoc.creature)) {
                    this.world[this.player.location.x][this.player.location.y].creature = null;
                    newLoc.creature = this.player;
                    this.player.location.x += x;
                    this.player.location.y += y;
                } else {
                    this.player.attack(newLoc.creature);
                }
            } else {
                this.log("You cannot move there.");
            }
        },
        getFrame: function () {
            let x = this.player.location.x - Math.floor(this.frameX / 2);
            let quadX = Math.floor(this.frameX / 4);
            x = Math.floor(x / (quadX * 2)) * quadX * 2 + quadX;
            if (x < 0) x = 0;
            if (x > this.worldX - this.frameX) x = this.worldX - this.frameX;

            let y = this.player.location.y - Math.floor(this.frameY / 2);
            let quadY = Math.floor(this.frameY / 4);
            y = Math.floor(y / (quadY * 2)) * quadY * 2 + quadY;
            if (y < 0) y = 0;
            if (y > this.worldY - this.frameY) y = this.worldY - this.frameY;

            for (let i = 0; i < this.frameX; i++) {
                for (let j = 0; j < this.frameY; j++) {
                    this.frame[i][j] = this.world[i + x][j + y].getVisible();
                }
            }
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
        }
    };
    game.init();
    return game;
}
