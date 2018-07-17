const Line = function (x1, y1, x2, y2) {
    let points = [];

    let dx = Math.abs(x2-x1);
    let dy = Math.abs(y2-y1);

    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        points.push({x: x1, y: y1})
        if (x1 == x2 && y1 == y2) {
            break;
        }

        let e2 = err * 2;
        if (e2 > -dx) {
            err -= dy;
            x1 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    return points;
}