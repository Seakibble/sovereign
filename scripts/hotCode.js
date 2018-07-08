/**
 * Uncategorized code that should eventually be moved elsewhere
 */

const Thing = function () {
    return {
        type: "empty",
        isPassable: true,
        colour: 'grey',
        img: "."
    };
}

const Wall = function () {
    let wall = Thing();
    wall.type = "wall";
    wall.img = "#";
    wall.isPassable = false;
    return wall;
}

const Player = function () {
    let player = Thing();
    player.type = "player";
    player.img = "@";
    player.colour = 'green';

    // Player specific properties
    player.x = 0;
    player.y = 0;
    player.name = "Kaethrion";
    player.race = "Half-elf";
    player.class = "Paladin";

    player.stats = {
        strength: rollDice("4d6k3"),
        dexterity: rollDice("4d6k3"),
        constitution: rollDice("4d6k3"),
        intelligence: rollDice("4d6k3"),
        wisdom: rollDice("4d6k3"),
        charisma: rollDice("4d6k3"),
    }
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
    player.getStatMod = function (stat) {
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

    player.mhp = 10 + player.getStatMod("CON");
    player.chp = player.mhp;

    return player;
}
