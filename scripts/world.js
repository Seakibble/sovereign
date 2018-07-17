// Tile data object
const TILE = {
    UNKNOWN: {name: "UNKNOWN", glyph: " ", colour: "white"},
    BOUNDS: {name: "BOUNDS", glyph: "X", colour: "red"},
    FLOOR: {name: "FLOOR", glyph: ".", colour: "lightGrey"},
    WALL: {name: "WALL", glyph: "#", colour: "lightGrey"},

    Tile: function (_type) {
        return {
            name: _type.name,
            type: "tile",
            glyph: _type.glyph,
            colour: _type.colour,
            isPassable: function () {
                return this.name !== "WALL" && this.name !== "BOUNDS"
            },
            isTransparent: function () {
                return this.name !== "WALL" && this.name !== "BOUNDS"
            }
        }
    }
}

// World data object
const World = function (_x, _y) {
    let world = {
        width: _x,
        height: _y,
        player: null,
        screenWidth: 60,
        screenHeight: 30,
        tiles: [],
        creatures: [],
        items: [],
        update: function (key) {
            // Update player first
            this.player.update(key);

            // Update monsters afterwards
            for (let i = 0; i < this.creatures.length; i++) {
                if (this.creatures[i].type !== "player") {
                    this.creatures[i].update();
                }
            }
        },
        getTile: function (_x, _y) {
            if (_x < 0 || _x >= this.width || _y < 0 || _y >= this.height) {
                return TILE.Tile(TILE.BOUNDS);
            } else {
                return this.tiles[_x][_y];
            }
        },
        getItem: function (_x, _y) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].x == _x && this.items[i].y == _y) {
                    return this.items[i];
                }
            }
            return null;
        },
        getCreature: function (_x, _y) {
            for (let i = 0; i < this.creatures.length; i++) {
                if (this.creatures[i].x == _x && this.creatures[i].y == _y) {
                    return this.creatures[i];
                }
            }
            return null;
        },
        remove: function (object) {
            let list = null;
            if (object.type === "creature") {
                list = this.creatures;
            } else {
                list = this.items;
            }
            for (let i = 0; i < list.length; i++) {
                if (list[i].x === object.x && list[i].y === object.y) {
                    list.splice(i, 1);
                    return;
                }
            }
        },
        addAtEmptyLocation: function (_object) {
            let x = 0;
            let y = 0;
            do {
                x = randomInt(0, this.width - 1);
                y = randomInt(0, this.height -1);
            } while (!this.getTile(x,y).isPassable() || !isNull(this.getItem(x,y)) || !isNull(this.getCreature(x,y)));  

            _object.x = x;
            _object.y = y;
            if (_object.type === "creature") {
                this.creatures.push(_object);
            } else if (_object.type === "player") {
                this.player = _object;
                this.creatures.push(_object);
            } else if (_object.type === "item") {
                this.items.push(_object);
            }
        }
    };

    return world;
};


// World Generator
// Handles populating the world with terrain
const WorldGen = {
    world: {},
    randomTiles: function (_x, _y) {
        this.world = World(_x, _y);

        // Generate Random Tiles
        for (let i = 0; i < _x; i++) {
            this.world.tiles[i] = [];
            for (let j = 0; j < _y; j++) {
                this.world.tiles[i][j] = Math.random() < 0.5 ? TILE.Tile(TILE.FLOOR) : TILE.Tile(TILE.WALL);
            }
        }
        
        return this;
    },
    smooth: function (iterationsMin = 2, iterationsVariance = 6, resolutionMin = 1, resolutionVariance = 2) {
        let iterations = randomInt(iterationsMin, iterationsVariance);

        let tiles2 = [];
        for (let time = 0; time < iterations; time++) {
            // Initialize a duplicate for reference 
            for (let i = 0; i < this.world.width; i++) {
                tiles2[i] = [];
                for (let j = 0; j < this.world.height; j++) {
                    tiles2[i][j] = this.world.tiles[i][j];
                }
            }

            // Smooth the walls
            for (let x = 0; x < this.world.width; x++) {
                for (let y = 0; y < this.world.height; y++) {
                    let floors = 0;
                    let rocks = 0;

                    let resolution = randomInt(resolutionMin, resolutionVariance)

                    for (let ox = -resolution; ox <= resolution; ox++) {
                        for (let oy = -resolution; oy <= resolution; oy++) {
                            if (x + ox < 0 || x + ox >= this.world.width || y + oy < 0 || y + oy >= this.world.height) {
                                continue;
                            }

                            if (tiles2[x + ox][y + oy].name === TILE.Tile(TILE.FLOOR).name) {
                                floors++;
                            } else {
                                rocks++;
                            }
                        }
                    }

                    // Apply the new tile to the actual world, not the duplicate!
                    this.world.tiles[x][y] = floors >= rocks ? TILE.Tile(TILE.FLOOR) : TILE.Tile(TILE.WALL);                    
                }
            }

            // Re-add walls around the edges of the world,
            //  so the caves don't suddenly stop, or have
            //  inexplicable straight lines.
            this.sealEdges();
        }
        return this;
    },
    sealEdges: function () {
        for (let x = 0; x < this.world.width; x++) {
            this.world.tiles[x][0] = TILE.Tile(TILE.WALL);
            for (let y = 0; y < this.world.height; y++) {
                this.world.tiles[0][y] = TILE.Tile(TILE.WALL);     
                this.world.tiles[this.world.width-1][y] = TILE.Tile(TILE.WALL);           
            }
            this.world.tiles[x][this.world.height-1] = TILE.Tile(TILE.WALL);
        }
    },
    makeTestRoom: function (_size, _monsters, _loot) {
        this.randomTiles(_size, _size).smooth();
        this.addPlayer();

        return this.world;
    },
    makeCaves: function (_size, _monsters, _loot) {
        this.randomTiles(_size, _size).smooth();
        this.addPlayer();
        this.addMonsters(_monsters);
        this.addLoot(_loot);        

        return this.world;
    },
    addMonsters: function (num) {
        for (let i = 0; i < num; i++) {
            this.world.addAtEmptyLocation(Kobold(this.world));
        }
    },
    addLoot: function (num) {
        for (let i = 0; i < num; i++) {
            if (randomInt(0,1) === 1) {
                this.world.addAtEmptyLocation(Weapon());
            } else {
                this.world.addAtEmptyLocation(Cash());
            }            
        }
    },
    addPlayer: function () {
        this.world.addAtEmptyLocation(Player(this.world));
    },
}
