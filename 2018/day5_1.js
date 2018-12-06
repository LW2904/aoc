const rawInput = require('./utils').readInput(5);

const polarity = (char) => char === char.toUpperCase();
const areReacting = (c1, c2) => c1.toUpperCase() === c2.toUpperCase()
    && polarity(c1) !== polarity(c2);

const solve = (input) => {
    const stack = [];

    for (let i = 0; i < input.length; i++) {
        if (stack.length > 0 && areReacting(input[i], stack[stack.length - 1]))
            stack.pop();
        else stack.push(input[i]);
    }

    return stack.length;
};

console.log(solve(rawInput));
