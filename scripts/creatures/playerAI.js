const PlayerAI = function (_world, _player) {
    let ai = CreatureAI(_world, _player);

    // Player input
    ai.update = function (key) {
        switch (key) {
            // Movement
            case '1':   this.creature.move(-1, 1);      break;
            case '2':   this.creature.move(0, 1);       break;
            case '3':   this.creature.move(1, 1);       break;
            case '4':   this.creature.move(-1, 0);      break;
            case '6':   this.creature.move(1, 0);       break;
            case '7':   this.creature.move(-1, -1);     break;
            case '8':   this.creature.move(0, -1);      break;
            case '9':   this.creature.move(1, -1);      break;
        }
    };

    // Player Field of View
    ai.fov = {
        world: _world,
        player: _player,
        visible: [],
        tiles: [],
        visibleFlush: function () {
            this.visible = [];
            for (let i = 0; i < _world.width; i++) {
                this.visible[i] = [];
            }
        },
        isVisible: function (_x, _y) {

            return _x >= 0 && _y >= 0 && !isNull(this.visible[_x]) && this.visible[_x][_y] == true;
        },
        getTile: function(_x, _y) {
            return this.tiles[_x][_y];
        },
        update: function () {
            this.visibleFlush();
            for (let x = -this.player.visionRadius; x < this.player.visionRadius; x++) {
                for (let y = -this.player.visionRadius; y < this.player.visionRadius; y++) {
                    if (Math.pow(x,2) + Math.pow(y, 2) > Math.pow(this.player.visionRadius, 2)) {
                        continue;
                    }
            
                    if (this.player.x + x < 0 || this.player.x + x >= this.world.width || this.player.y + y < 0 || this.player.y + y >= this.world.height) {
                        continue;
                    }
            
                    let line = Line(this.player.x, this.player.y, this.player.x + x, this.player.y + y);
                    for (let i = 0; i < line.length; i++) {
                        let tile = this.world.getTile(line[i].x, line[i].y);
                        this.visible[line[i].x][line[i].y] = true;
                        this.tiles[line[i].x][line[i].y] = tile;
                
                        if (!tile.isTransparent()) {
                            break;
                        }
                    }
                }
            }
        }
    };

    for (let i = 0; i < _world.width; i++) {
        ai.fov.visible[i] = [];
        ai.fov.tiles[i] = [];
    }

    for (let x = 0; x < _world.width; x++){
        for (let y = 0; y < _world.height; y++){
            ai.fov.tiles[x].push(TILE.Tile(TILE.UNKNOWN));
        }
    }

    ai.canSee = function (_x, _y) {
        return this.fov.isVisible(_x, _y);
    }

    return ai;
}