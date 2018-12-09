const rawInput = require('./utils').readInput(6);
const rawExample = require('./utils').readExample(6);

const getDistance = (c1, c2) => Math.abs(c2[0] - c1[0])
    + Math.abs(c2[1] - c1[1]);

const getDistances = (point, coords) => coords.map((coord, index) => ({
        index,
        dist: getDistance(point, coord),
    })).sort((a, b) => a.dist - b.dist);

const getRectangle = (coords) => {
    const x = coords.map((coord) => coord[0]).sort((a, b) => a - b);
    const y = coords.map((coord) => coord[1]).sort((a, b) => a - b);

    return [ [ x[0], y[0] ], [ x[x.length - 1], y[y.length - 1] ] ];
};

const solve = (input) => {
    const coords = input.split('\n')
        .map((line) => line.split(', ').map((coord) => parseInt(coord, 10)));
    
    const rect = getRectangle(coords);

    const points = [];
    for (let y = rect[0][1]; y <= rect[1][1]; y++) {
        points.push([]);

        for (let x = rect[0][0]; x <= rect[1][0]; x++) {
            const point = { loc: [ x, y ], index: -1, dist: -1 };
            const dists = getDistances(point.loc, coords);

            point.dist = dists[0].dist;
            if (dists[0].dist !== dists[1].dist)
                point.index = dists[0].index;

            points[points.length - 1].push(point);
        }
    }

    const infinites = new Set();

    for (const row of points) {
        infinites.add(row[0].index);
        infinites.add(row[row.length - 1].index);
    }

    points[0].forEach((point) => infinites.add(point.index));
    points[points.length - 1].forEach((point) => infinites.add(point.index));

    infinites.delete(-1);

    const areas = [];

    for (const row of points) {
        for (const point of row) {
            if (!infinites.has(point.index) && point.index !== -1)
                areas[point.index] = areas[point.index] + 1 || 1;
        }
    }

    return areas.sort((a, b) => b - a)[0];
};

console.log(solve(rawInput));
