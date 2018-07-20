/**
 * Weapon
 */
const Weapon = function (weaponName = null) {
    let weapon = {
        name: "",
        type: "item",
        category: "",
        glyph: "!",
        colour: "yellow",
        value: 0,
        x: null,
        y: null,
        enhancement: 0,
        damageDice: "",
        flags: [],
        attack: function (_details) {
            let attack = {};
            attack.naturalRoll = rollDice("1d20");
            let damageRoll = rollDice(this.damageDice);

            if (attack.naturalRoll === 20) {
                attack.hit = 100;
                attack.damage = damageRoll + rollDice(this.damageDice) + this.enhancement + _details.damageBonus;
            } else if (attack.naturalRoll === 1) {
                attack.hit = -100;
                attack.damage = 0;
            } else {
                attack.hit = attack.naturalRoll + this.enhancement + _details.attackBonus;
                attack.damage = damageRoll + this.enhancement + _details.damageBonus;
            }

            if (this.flags) {
                attack.damage = Math.floor(attack.damage / 2);
            }

            return attack;
        },
        addProperty: function (_flag) {
            this.flags.push(_flag);
        },
        hasProperty: function (_flag) {
            return this.flags.find((el) => el === _flag);
        }
    }

    let weaponData = [];
    if (!isNull(weaponName)) {
        weaponData = WEAPON_TABLE.find((entry) => entry[0] === weaponName);
    } else {
        let index = randomInt(0, WEAPON_TABLE.length - 1);
        weaponData = WEAPON_TABLE[index];
    }

    
    if (!isNull(weaponData)) {
        weapon.name = weaponData[0];
        weapon.glyph = weaponData[1];
        weapon.value = weaponData[2];
        weapon.category = weaponData[3];
        weapon.damageDice = weaponData[4];
        weapon.flags = weaponData[5];
    } else {
        console.log(weaponName + " not found in the weapon table.");
    }

    return weapon;
}

/**
 * Special weapon flags:
 *      broken - deals half damage.
 */

const WEAPON_TABLE = [
    // Simple Melee
    //  NAME            GLYPH    VALUE   CATEGORY     DAMAGE DIE  FLAGS
    ["Club",            "|",     1,      "simple",   "1d4",       [  'light'                                                                                            ]],
    ["Dagger",          "|",     3,      "simple",   "1d4",       [  'light',   'finesse',  'thrown'                                                                    ]],
    ["Greatclub",       "|",     2,      "simple",   "1d8",       [                                     'two-handed'                                                    ]],
    ["Handaxe",         "|",     5,      "simple",   "1d6",       [  'light',               'thrown'                                                                    ]],
    ["Javelin",         "|",     1,      "simple",   "1d4",       [                         'thrown'                                                                    ]],
    ["Light Hammer",    "|",     2,      "simple",   "1d4",       [  'light',               'thrown'                                                                    ]],
    ["Mace",            "|",     5,      "simple",   "1d6",       [                                                                                                     ]],
    ["Quarterstaff",    "|",     2,      "simple",   "1d6",       [                                                     'versatile'                                     ]],
    ["Sickle",          "|",     1,      "simple",   "1d4",       [  'light'                                                                                            ]],
    ["Spear",           "|",     1,      "simple",   "1d6",       [                         'thrown',                   'versatile'                                     ]],

    // Martial Melee
    //  NAME            GLYPH   VALUE   CATEGORY     DAMAGE DIE  FLAGS
    ["Battleaxe",       "|",    10,     "martial",   "1d8",      [                                                     'versatile'                                     ]],
    ["Flail",           "|",    10,     "martial",   "1d8",      [                                                                                                     ]],
    ["Glaive",          "|",    20,     "martial",   "1d10",     [                                     'two-handed',                   'reach',    'heavy'             ]],
    ["Greataxe",        "|",    30,     "martial",   "1d12",     [                                     'two-handed',                               'heavy'             ]],
    ["Greatsword",      "|",    50,     "martial",   "2d6",      [                                     'two-handed',                               'heavy'             ]],
    ["Halberd",         "|",    20,     "martial",   "1d10",     [                                     'two-handed',                   'reach',    'heavy'             ]],
    ["Lance",           "|",    10,     "martial",   "1d12",     [                                                                     'reach',            'special'   ]],
    ["Longsword",       "|",    15,     "martial",   "1d8",      [                                                     'versatile'                                     ]],
    ["Maul",            "|",    10,     "martial",   "2d6",      [                                     'two-handed',                   'reach'                         ]],
    ["Morningstar",     "|",    15,     "martial",   "1d8",      [                                                                                                     ]],
    ["Pike",            "|",    5,      "martial",   "1d10",     [                                     'two-handed',                   'reach',    'heavy'             ]],
    ["Rapier",          "|",    25,     "martial",   "1d8",      [             'finesse'                                                                               ]],
    ["Scimitar",        "|",    25,     "martial",   "1d6",      [  'light',   'finesse'                                                                               ]],
    ["Shortsword",      "|",    10,     "martial",   "1d6",      [  'light',   'finesse'                                                                               ]],
    ["Trident",         "|",    5,      "martial",   "1d4",      [                         'thrown',                   'versatile'                                     ]],
    ["War Pick",        "|",    5,      "martial",   "1d8",      [                                                                                                     ]],
    ["Warhammer",       "|",    15,     "martial",   "1d8",      [                                                     'versatile'                                     ]],
    ["Whip",            "|",    2,      "martial",   "1d4",      [             'finesse',                                              'reach'                         ]],
];
