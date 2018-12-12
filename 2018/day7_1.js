const rawInput = require('./utils').readInput(7);
const rawExample = require('./utils').readExample(7);

const matching = (base, comparate) =>
    comparate.filter((el) => base.includes(el));

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
        [].concat(...description.map((item) => [ item.step, item.dependency ])),
    )];

    const done = [];
    const start = items.filter((step) => conditions[step] === undefined);

    while (true) {
        for (const cond in conditions) {
            conditions[cond] = conditions[cond]
                .filter((c) => !done.includes(c));
        }

        const available = [ ...new Set(Object.keys(conditions)
            .filter((cond) => !conditions[cond].length).concat(start)) ].sort();

        done.push(available[0]);

        
        console.log(Object.keys(conditions));

        // break;

        if (conditions[available[0]])
            delete conditions[available[0]];
        else delete start[available[0]];

        if (!Object.keys(conditions).length)
            break;
    }

    return { description, conditions, items, done, start };
};

console.log(solve(rawExample));
