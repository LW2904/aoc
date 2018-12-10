const rawInput = require('./utils').readInput(7);
const rawExample = require('./utils').readExample(7);

const getPossible = (done, rqmts) => {

};

const solve = (input) => {
    const description = input.split('\n').map((line) => {
        const split = line.toLowerCase().split('step');
        return { step: split[2][1], dependency: split[1][1] }
    });

    const conditions = description.reduce((cond, cur) => {
        if (cond[cur.step])
            cond[cur.step].push(cur.dependency);
        else cond[cur.step] = [ cur.dependency ];

        return cond;
    }, {});

    const items = [ ...new Set(
        [].concat(...description.map((item) => [ item.step, item.dependency ]))
    )];

    const order = [
        items.filter((step) => conditions[step] === undefined)[0]
    ];

    return { description, conditions, items, order };
};

console.log(solve(rawExample));
