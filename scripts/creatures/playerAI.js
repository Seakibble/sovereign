const PlayerAI = function (_world, _player) {
    let ai = CreatureAI(_world, _player);

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

    return ai;
}