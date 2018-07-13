const CreatureAI = function (_world, _creature) {
    let ai = {
        creature: _creature,
        world: _world,
        searchRadius: 10,
        target: _world.player,
        move: function (_x, _y) {
            if (this.world.getTile(_x, _y).isPassable()) {
                let other = this.world.getCreature(_x, _y);
                if (isNull(other)) {
                    this.creature.x = _x;
                    this.creature.y = _y;

                    other = this.world.getItem(_x, _y);
                    if (!isNull(other)) {
                        this.pickUp(other);
                    }
                } else if (this.creature.name !== other.name){
                    this.attack(other);
                }
            } else if (this.creature.type === "player") {
                game.log("You cannot move there.");
                return false;
            }
            return true;
        },
        wander: function () {
            let x = randomInt(-1, 1);
            let y = randomInt(-1, 1);
            this.creature.move(x, y);
        },
        hunt: function () {
            if (!isNull(this.target)) {
                if (this.target.x < this.creature.x + this.searchRadius &&
                    this.target.x > this.creature.x - this.searchRadius &&
                    this.target.y < this.creature.y + this.searchRadius &&
                    this.target.y > this.creature.y - this.searchRadius) {
                        let x = 0;
                        let y = 0;

                        if (this.target.x < this.creature.x) {
                            x -= 1;
                        }
                        if (this.target.x > this.creature.x) {
                            x += 1;
                        }
                        if (this.target.y < this.creature.y) {
                            y -= 1;
                        }
                        if (this.target.y > this.creature.y) {
                            y += 1;
                        }

                        if (!this.creature.move(x, y)) {
                            
                        }
                        return;
                    }
            }
            this.wander();
        },
        pickUp: function (_item) {
            if (_item.name === "Gold") {
                if (this.creature.type === "player") {
                    game.log("You pick up " + _item.value +" gold pieces!");
                }
                this.creature.gold += _item.value;
                this.world.remove(_item);
            } else {
                if (this.creature.type === "player") {
                    game.log("You pick up the " + _item.name + ".");
                }
                this.creature.inventory.push(_item);
                _item.x = null;
                _item.y = null;
            }
        },
        update: function () {
            return;
        },
        attack: function (target) {
            let message = "";
            if (!isNull(this.creature.weapon)) {
                let attack = this.creature.weapon.attack(this.creature.getWeaponDetails());
                if (attack.hit >= target.ac) {
                    if (attack.hit === 100) {
                        message = "It is an excellent hit! ";
                    } else {
                        message = attack.hit + " to Hit | ";
                    }
                    message += "The " + this.creature.name + " hits the " + target.name;
                    if (attack.damage > 0) {
                        message += ", dealing " + attack.damage + " damage.";
                        target.takesDamage(attack.damage);
                    } else {
                        message += " but deal no damage!";
                    }
    
                } else {
                    if (attack.hit === -100) {
                        message = "The " + this.creature.name + " doesn't even come close to hitting the " + target.name + "."
                    } else {
                        message = attack.hit + " to Hit | The " + this.creature.name + " misses the " + target.name + ".";
                    }
                }
            } else {
                message = "You have no weapon.";
            }
            game.log(message);
            if (target.chp <= 0) {
                if (this.creature.type === "player") {
                    message = "You have slain the " + target.name + ".";
                    this.creature.exp += target.exp;
                } else if (target.type === "player") {
                    game.log("You have been slain by the " + this.creature.name + "!");
                } else {
                    message = "The " + this.creature.name + " has slain the " + target.name + ".";
                }
                game.log(message);
            }            
        },    
    };

    return ai;
};

const AI_TEMPLATES = {
    aggressive: function (_world, _creature) {
        let ai = CreatureAI(_world, _creature);
        ai.update = function () {
            if (!isNull(this.target)) {
                this.hunt(this.target);
            } else {
                if (randomInt(0,100) > 50) {
                    this.wander();
                }
            }
        }

        return ai;
    }
};
