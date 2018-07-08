/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Returns the result of a given dice roll.
 */
function rollDice(roll) {
    let keep = 0;
    let num = 0;
    let die = 0;

    if (roll.search("d") !== -1) {
        roll = roll.split("d");
        num = roll[0];
        if (num === "undefined" || num === "") {
            num = 1;
        }
        roll = roll[1];
    } else {
        num = 1;
    }


    if (roll.search("k") !== -1) {
        roll = roll.split("k");
        die = roll[0];
        keep = roll[1];
    } else {
        die = roll;
        keep = num;
    }

    if (keep === "undefined" || keep === "") {
        keep = num;
    }

    total = 0;
    let rolls = [];

    for (let i = 0; i < num; i++) {
        rolls.push(randomInt(1, die));
    }
    if (keep < num) {
        rolls.sort(function (a, b) {
            return (a > b);
        });

        rolls = rolls.slice(num - keep);
    }

    for (let i = 0; i < rolls.length; i++) {
        total += rolls[i];
    }

    return total;
}