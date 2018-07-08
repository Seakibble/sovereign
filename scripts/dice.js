/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Returns the result of a given dice roll.
 */
function rollDice(roll) {
    let keep = 0;
    let num = 0;
    let die = 0;

    if (isNumeric(roll)) {
        return roll;
    }

    if (roll.search("d") !== -1) {
        roll = roll.split("d");
        num = roll[0];
        if (isNull(num) || num === "") {
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

    if (isNull(keep) || keep === "") {
        keep = num;
    }

    total = 0;
    let rolls = [];

    // console.log(num + " d " + die + " k " + keep);

    for (let i = 0; i < num; i++) {
        rolls.push(randomInt(1, die));
    }

    if (keep !== num) {
        if (0 < keep && keep < num) {
            // Keep dice
            rolls.sort(function (a, b) {
                return (a > b);
            });
        } else if (-num < keep && keep < 0) {
            // Drop dice
            rolls.sort(function (a, b) {
                return (a < b);
            });
        }

        rolls = rolls.slice(num - Math.abs(keep));
    }

    for (let i = 0; i < rolls.length; i++) {
        total += rolls[i];
    }

    return total;
}
