const PlayerAI = function (_world, _player) {
    let ai = CreatureAI(_world, _player);

    ai.update = function (key) {
        switch (key) {
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
    };

    ai.cmdMove = function (direction) {
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

        let newX = this.creature.x + x;
        let newY = this.creature.y + y;

        this.move(newX, newY);
    };

    return ai;
}