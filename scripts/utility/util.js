/**
 * Uncategorized convenience functions
 */
function isNull(x) {
    return ((typeof x === undefined) || (x === undefined) || (x === 'null') || (x === null) || (x === 'undefined'));
}

function getRenderable(obj) {
    return {
        x: obj.x,
        y: obj.y,
        glyph: obj.glyph,
        colour: obj.colour,
    };
}