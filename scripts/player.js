const Player = function () {
    let player = Creature();
    player.type = "player";
    player.glyph = "@";
    player.colour = 'white';
    player.proficiency = 2;


    player.exp = 0;
    player.expToLevel = 10;

    player.weapon = Weapon();

    player.stats = {
        strength: rollDice("4d6k3"),
        dexterity: rollDice("4d6k3"),
        constitution: rollDice("4d6k3"),
        intelligence: rollDice("4d6k3"),
        wisdom: rollDice("4d6k3"),
        charisma: rollDice("4d6k3"),
    }

    // Provide name...
    player.name = "Kaethrion";

    // Select Race...
    player.race = "Half-elf";

    // Select Class...
    player.class = "Paladin";
    player.level = 1;    
    player.proficiencies = [
        "simple",
        "martial",
    ];

    player.mhp = 10 + player.getStatMod("CON");
    player.chp = player.mhp;

    player.ac = 10 + player.getStatMod("DEX");

    // Player specific properties

    player.update = function () {
        // Check to see if the player is ready to level up.
        if (this.exp >= this.expToLevel) {
            this.level++;
            this.exp -= this.expToLevel;
            this.expToLevel = this.level * 10;
            
            game.log("Welcome to Level " + this.level + "!");

            let message = "";
            // Hit Points
            let extraHP = rollDice(player.hitDie) + player.getStatMod("CON");
            if (extraHP > 0) {
                this.mhp += extraHP;
                this.chp += extraHP;
                message += "You've gained " + extraHP + " Hit Points. ";
            }

            // Proficiency Bonus
            let newProficiency = Math.floor(this.level / 4) + 2;

            if (newProficiency > this.proficiency) {
                this.proficiency = newProficiency;
                message += "Your Proficiency Bonus has increased.";
            }

            game.log(message);

            // Check to see if the player still has enough XP to level up again
            if (this.exp >= this.expToLevel) {
                this.update();
            }
        }
    };

    player.printStat = function (stat) {
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

        let modifier = this.getStatMod(stat);

        if (modifier > 0) {
            modifier = "+" + modifier;
            modifier = "(" + modifier + ")";
        } else if (modifier === 0) {
            modifier = " ";
        } else {
            modifier = "(" + modifier + ")";
        }


        if (score < 10) {
            score += " ";
        }
        return score + "  " + modifier
    };

    return player;
}