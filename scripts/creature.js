const Creature = function (_worldRef) {
    return {
        type: "creature",
        name: "Kobold",
        glyph: "k",
        colour: 'red',
        x: 0,
        y: 0,
        worldRef: _worldRef,
        dead: false,
        exp: 1,
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        hitDie: "d10",
        mhp: 10,
        chp: 10,
        ac: 10,
        proficiency: 1,
        proficiencies: [
            "simple",
        ],
        weapon: Weapon("Dagger"),
        getStatMod: function (stat) {
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
        },
        getWeaponDetails: function () {
            let damage = this.getStatMod("STR");
            if (this.weapon.flags.find((el) => el === 'finesse') && damage < this.getStatMod("DEX")) {
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
        },    
        attack: function (target) {
            let message = "";
            if (!isNull(this.weapon)) {
                let attack = this.weapon.attack(this.getWeaponDetails());
                if (attack.hit >= target.ac) {
                    if (attack.hit === 100) {
                        message = "It is an excellent hit! ";
                    } else {
                        message = attack.hit + " to Hit | ";
                    }
                    message += "The " + this.type + " hits the " + target.name;
                    if (attack.damage > 0) {
                        message += ", dealing " + attack.damage + " damage.";
                        target.takesDamage(attack.damage);
                    } else {
                        message += " but deal no damage!";
                    }
    
                } else {
                    if (attack.hit === -100) {
                        message = "The " + this.type + " doesn't even come close to hitting the " + target.name + "."
                    } else {
                        message = attack.hit + " to Hit | The " + this.type + " misses the " + target.name + ".";
                    }
                }
            } else {
                message = "You have no weapon.";
            }
            game.log(message);
    
            if (target.dead) {
                if (this.type === "player") {
                    message = "You have slain the " + target.name + ".";
                    this.exp += target.exp;
                } else {
                    message = "The " + this.type + "has slain the " + target.name + ".";
                }
    
                game.log(message);
                game.world.removeCreature(target);
            }
        },    
        update: function () {
            if (Math.abs(this.x - game.player.x) < 10 && Math.abs(this.y - game.player.y) < 10) {
                // AI stuff to go here...
            }
        },    
        takesDamage: function (damage) {
            this.chp -= damage;
            if (this.chp <= 0) {
                this.dead = true;
            }
        }
    };
}