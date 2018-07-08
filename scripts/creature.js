const Creature = function (_x = 0, _y = 0) {
    let creature = Nothing();
    creature.type = "creature";
    creature.name = "kobold";
    creature.img = "k";
    creature.colour = 'red';

    // Creature specific properties
    creature.dead = false;
    creature.exp = 100;

    creature.location = {
        x: _x,
        y: _y
    };

    creature.mhp = 4;
    creature.chp = creature.mhp;

    creature.ac = 10;

    creature.proficiency = 1;

    creature.proficiencies = [
        "simple",
    ];

    creature.stats = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    }

    creature.getStatMod = function (stat) {
        let score = 0;
        switch (stat) {
            case "STR": score = this.stats.strength;
                break;
            case "DEX": score = this.stats.dexterity;
                break;
            case "CON": score = this.stats.constitution;
                break;
            case "INT": score = this.stats.intelligence;
                break;
            case "WIS": score = this.stats.wisdom;
                break;
            case "CHA": score = this.stats.charisma;
                break;
        }

        let modifier = Math.floor((score - 10) / 2);

        return modifier;
    }

    creature.weapon = Weapon();

    creature.getWeaponDetails = function () {
        let damage = this.getStatMod("STR");
        if (this.weapon.finesse && damage < this.getStatMod("DEX")) {
            damage = this.getStatMod("DEX");
        }
        damage += this.weapon.enhancement;
        attack = damage;

        if (this.proficiencies.find((el) => el === this.weapon.type)) {
            attack += this.proficiency;
        }

        return {
            attackBonus: attack,
            damageBonus: damage,
        };
    };

    creature.attack = function (target) {
        let message = "";
        if (!isNull(this.weapon)) {
            let attack = this.weapon.attack(this.getWeaponDetails());
            if (attack.hit >= target.ac) {
                if (attack.hit === 100) {
                    message = "It is an excellent hit! ";
                } else {
                    message = attack.hit + " to Hit | ";
                }
                message += "The " + this.type + " hits the " + target.type;
                if (attack.damage > 0) {
                    message += ", dealing " + attack.damage + " damage.";
                    // target.takesDamage(attack.damage);
                } else {
                    message += " but deal no damage!";
                }

            } else {
                if (attack.hit === -100) {
                    message = "The " + this.type + " doesn't even come close to hitting the " + target.type + "."
                } else {
                    message = attack.hit + " to Hit | The " + this.type + " misses the " + target.type + ".";
                }
            }
        } else {
            message = "You have no weapon.";
        }
        game.log(message);

        if (target.dead) {
            if (this.type === "player") {
                message = "You have slain the " + target.type + ".";
                this.exp += target.exp;
            } else {
                message = "The " + this.type + "has slain the " + target.type + ".";
            }

            game.log(message);
            game.world[target.location.x][target.location.y].creature = null;
        }

    }

    creature.takesDamage = function (damage) {
        this.chp -= damage;
        if (this.chp <= 0) {
            creature.dead = true;
        }
    }

    return creature;
}