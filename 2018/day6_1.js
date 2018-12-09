const rawInput = require('./utils').readInput(6);
const rawExample = require('./utils').readExample(6);

const getDistance = (c1, c2) => Math.abs(c2.x - c1.x) + Math.abs(c2.y - c1.y);
const filterInfinite = (coords, min, max) => coords.filter((coord) => (
        !(coord.x >= max.x || coord.y >= max.y) &&
        !(coord.x <= min.x || coord.y <= min.y)
));

const solve = (input) => {
    const coords = input.split('\n')
        .map((line) => line.split(', ').reduce((acc, cur, i) => {
            acc[i % 2 ? 'y' : 'x'] = parseInt(cur, 10);
            return acc;
        }, {}));
    
    const allX = coords.map((coord) => coord.x).sort((a, b) => a - b);
    const allY = coords.map((coord) => coord.y).sort((a, b) => a - b);

    const min = {
        x: allX[0],
        y: allY[0],
    }, max = {
        x: allX[allX.length - 1],
        y: allY[allY.length - 1],
    };

    let vis = '';
    const locations = [];

    for (let { y } = min; y <= max.y; y++) {
        for (let { x } = min; x <= max.x; x++) {
            const dsts = [];

            for (let index = 0; index < coords.length; index++) {
                const dist = getDistance({ x, y }, coords[index]);

                dsts.push({ index, dist });
            }

            dsts.sort((a, b) => a.dist - b.dist);

            let location = { x, y };

            if (dsts[0].dist === dsts[1].dist)
                location.index = -1;
            else location.index = dsts[0].index;

            vis += location.index === -1 ? '#' :
                String.fromCharCode((!dsts[0].dist ? 65 : 97) + location.index);
            
            const coord = coords[dsts[0].index];
            if (!(coord.x >= max.x || coord.y >= max.y) &&
                !(coord.x <= min.x || coord.y <= min.y))
            {
                locations.push(location);
            }
        }

        vis += '\n';
    }

    console.log(vis);

    const areas = [];
    for (const loc of locations) {
        if (loc.index === -1)
            continue;

        areas[loc.index] = areas[loc.index] ? areas[loc.index] + 1 : 1;
    }

    return areas.sort((a, b) => b - a)[0];
};

console.log(solve(rawExample));

// console.log(getDistance({ x: 0, y: 0 }, { x: 0, y: 0 }))
