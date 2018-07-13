const Kobold = function (_world) {
    let kobold = Creature(_world);

    /**
     * Creature Appearance
     */
    kobold.glyph = "k";
    kobold.colour = "red";
    kobold.name = "Kobold"

    /**
     * Creature stats
     */

    kobold.stats = {
        strength:       7,
        dexterity:      15,
        constitution:   9,
        intelligence:   8,
        wisdom:         7,
        charisma:       8,
    },

    kobold.calculateMHP();
    kobold.restoreCHP();

    /**
     * Creature equipment
     */
    kobold.weapon = Weapon("Dagger");
    if (randomInt(0,10) > 8) {
        kobold.gold = randomInt(0,10);
    }

    /**
     * Creature Behaviour
     */
    kobold.actionsPerTurn = 0.8;
    kobold.ai = AI_TEMPLATES.aggressive(_world, kobold);

    return kobold;
}