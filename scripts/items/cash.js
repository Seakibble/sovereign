const Cash = function (_amount = 0) {
    if (_amount < 1) {
        _amount = randomInt(1, 100);
    }

    return {
        name: "Gold",
        type: "item",
        glyph: "$",
        colour: "gold",
        value: _amount,
        x: null,
        y: null,
    }
}