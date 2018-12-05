const rawInput = require('./utils').readInput(5);

const polarity = (char) => char === char.toUpperCase();
const samePolarity = (c1, c2) => polarity(c1) === polarity(c2);
const sameType = (c1, c2) => c1.toUpperCase() === c2.toUpperCase();

const solve = (input) => {
    input = input.split('');

    for (let i = 0; i < input.length - 1; i++) {
        const c1 = input[i], c2 = input[i + 1];
        console.log(`looking at ${c1}${c2}(${i}, ${i + 1})`);

        if (sameType(c1, c2) && !samePolarity(c1, c2)) {
            input.splice(i, 2);

            console.log(`  removed ${c1}${c2}(${i}, ${i + 1})`)

            i -= i < 2 ? 1 : 2;
        }
    }

    return input.join('').length;
};

console.log(solve('aA'));
