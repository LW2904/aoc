const rawInput = require('./utils').readInput(5);

const polarity = (char) => char === char.toUpperCase();
const areReacting = (c1, c2) => c1.toUpperCase() === c2.toUpperCase()
    && polarity(c1) !== polarity(c2);

const react = (poly) => {
    const stack = [];

    for (let i = 0; i < poly.length; i++) {
        if (stack.length > 0 && areReacting(poly[i], stack[stack.length - 1]))
            stack.pop();
        else stack.push(poly[i]);
    }

    return stack.length;
};

const purge = (char, poly) => {
    let purged = [];

    for (let i = 0; i < poly.length; i++)
        if (poly[i].toUpperCase() !== char)
            purged.push(poly[i]);
    
    return purged;
}

const solve = (input) => {
    let shortest = Infinity;

    for (let i = 65; i <= 90; i++) {
        const len = react(purge(String.fromCharCode(i), input));

        shortest = shortest > len ? len : shortest;
    }

    return shortest;
};

console.log(solve(rawInput));
