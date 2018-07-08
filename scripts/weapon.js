const Weapon = function () {
    return {
        name: "a dagger",
        type: "simple",
        enhancement: 0,
        damageDice: "1d4",
        finesse: true,
        attack: function (details) {
            let attack = {};
            attack.naturalRoll = rollDice("1d20");
            let damageRoll = rollDice(this.damageDice);

            if (attack.naturalRoll === 20) {
                attack.hit = 100;
                attack.damage = damageRoll + rollDice(this.damageDice) + this.enhancement + details.damageBonus;
            } else if (attack.naturalRoll === 1) {
                attack.hit = -100;
                attack.damage = 0;
            } else {
                attack.hit = attack.naturalRoll + this.enhancement + details.attackBonus;
                attack.damage = damageRoll + this.enhancement + details.damageBonus;
            }




            return attack;
        }
    }
}