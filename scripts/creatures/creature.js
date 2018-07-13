const Creature = function (_world) {
    let creature = {
        type: "creature",
        name: "Generic Creature",
        glyph: "?",
        colour: 'errorRed',
        x: 0,
        y: 0,
        ai: null,
        dead: false,
        exp: 1,
        actionsPerTurn: 1,
        currentSpeed: Math.random(), // this is to offset creatures actions, so they don't move in lockstep with each other
        inventory: [],
        gold: 0,
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
        weapon: null,
        setAI: function (ai) {
            this.ai = ai;
        },
        move: function (_x, _y){
            this.ai.move(this.x + _x, this.y + _y);
        },
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
    
            if (this.proficiencies.find((el) => el === this.weapon.category)) {
                attack += this.proficiency;
            }
    
            return {
                attackBonus: attack,
                damageBonus: damage,
            };
        },
        update: function () {
            this.currentSpeed++;
            
            let speed = (1 / this.actionsPerTurn);

            while(this.currentSpeed >= speed) {
                this.ai.update();
                this.currentSpeed -= speed;
            }
        },    
        takesDamage: function (damage) {
            this.chp -= damage;
            if (this.chp < 0) {
                this.chp = 0;
            }
            if (this.chp <= 0) {
                game.world.remove(this);
            }
        },
        calculateMHP: function () {
            this.mhp = Math.max(1, rollDice(this.hitDie) + this.getStatMod("CON"));
        },
        restoreCHP: function () {
            this.chp = this.mhp;
        }
    };
    
    creature.ai = CreatureAI(_world, creature);
    return creature;
}