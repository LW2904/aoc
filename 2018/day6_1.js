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

const getInfinites = (rect, coords) => {
    // const getClosest = (ornt) => {
    //     const infinites = [];

    //     for (let c = rect[0][ornt]; c < rect[1][ornt]; c++) {
    //         const dists = getDistances([ c, rect[0][ornt] ], coords).concat(
    //             getDistances([ c, rect[1][ornt] ], coords)
    //         ).sort((a, b) => a.dist - b.dist);

    //         infinites.push(...dists.filter((d, i, a) => d.dist === a[0].dist)
    //             .map((dist) => dist.index))
    //     }

    //     return infinites;
    // }

    // return [ ...new Set(getClosest(0).concat(getClosest(1))) ];

    const infinites = [];

    // for (let x = rect[0][0]; x < rect[1][0]; x++) {
    //     const dists = getDistances([ x, rect[0][1] ], coords).concat(
    //         getDistances([ x, rect[1][1] ], coords)
    //     ).sort((a, b) => a.dist - b.dist);

    //     infinites.push(...dists.filter((d, i, a) => d.dist === a[0].dist)
    //         .map((dist) => dist.index))
    // }

    for (let y = rect[0][1]; y < rect[1][1]; y++) {
        const dists = getDistances([ rect[0][1], y ], coords).concat(
            getDistances([ rect[1][1], y ], coords)
        ).sort((a, b) => a.dist - b.dist).filter(
            (d, i, a) => d.dist === a[0].dist
        );

        console.log(dists, dists.filter(
            (d, i, a) => d.index === a[0].index
        ), dists.length, dists.filter(
            (d, i, a) => d.index === a[0].index
        ).length);

        if (dists.length !== dists.filter(
                (d, i, a) => d.index === a[0].index
            ).lenght
        ) {
            console.log('yo')
            infinites.push(dists[0].index);
        }

        // infinites.push(...dists.filter((d, i, a) => d.dist === a[0].dist)
        //     .map((dist) => dist.index))
    }

    return [ ...new Set(infinites) ];
};

const solve = (input) => {
    const coords = input.split('\n')
        .map((line) => line.split(', ').map((coord) => parseInt(coord, 10)));
    
    const rect = getRectangle(coords);

    const infinites = getInfinites(rect, coords);

    return infinites;

    for (let y = rect[0][1]; y < rect[1][1]; y++) {
        const dists = getDistances([ rect[0][0], y ], coords).concat(
            getDistances([ rect[1][0], y ], coords),
        );

        infinites.push(...dists.filter((d, i, a) => d.dist === a[0].dist)
            .map((dist) => dist.index));
    }

    return { infinites };

    const points = [];
    for (let y = rect[0][1]; y < rect[1][1]; y++) {
        for (let x = rect[0][0]; x < rect[1][0]; x++) {
            const point = { loc: [ x, y ], index: -1 };
            const dists = getDistances(point.loc, coords);

            if (dists[0].dist === dists[1].dist)
                continue;
            
            point.index = dists[0].index;

            if (infinites.includes(point.index))
                continue;
            
            points.push(point);
        }
    }

    return { points };
};

console.log(solve(rawExample));
