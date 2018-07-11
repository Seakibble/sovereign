const Kobold = function (_world) {
    let kobold = Creature(_world);

    /**
     * Creature Appearance
     */
    kobold.glyph = "k";
    kobold.colour = "red";
    kobold.name = "Kobold"

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
    kobold.ai.update = function () {
        this.wander();
    }

    return kobold;
}