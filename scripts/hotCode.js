/**
 * Uncategorized code that should eventually be moved elsewhere
 */

function isNull(x) {
    return (typeof x === undefined) || (x === 'null') || (x === null) || (x === 'undefined');
}

const Nothing = function () {
    return {
        type: "empty",
        isPassable: true,
        colour: 'grey',
        img: "."
    };
}

const Wall = function () {
    let wall = Nothing();
    wall.type = "wall";
    wall.img = "#";
    wall.isPassable = false;
    return wall;
}

let Tile = function () {
    return {
        terrain: Nothing(),
        misc: [],
        creature: null,
        getVisible: function () {
            if (!isNull(this.creature)) {
                return this.creature;
            } else if (this.misc.length > 0) {
                return this.misc[this.misc.length - 1];
            } else {
                return this.terrain;
            }
        }
    };
};