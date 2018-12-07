const rawInput = require('./utils').readInput(6);
const rawExample = require('./utils').readExample(6);

const solve = (input) => {
    const coords = input.split('\n')
        .map((line) => line.split(', ').map((e) => parseInt(e, 10)));

    const maxX = coords.sort((a, b) => b[0] - a[0])[0][0];
    const maxY = coords.sort((a, b) => b[1] - a[1])[0][1];

    return {maxX, maxY};
}

console.log(solve(rawExample));
