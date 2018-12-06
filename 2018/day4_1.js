const rawInput = require('./utils').readInput(4);

const solve = (input) => {
    const events = input.split('\n').map((line) => ({
        body: line.slice(line.indexOf(']') + 2),
        date: new Date(line.slice(1, line.indexOf(']'))),
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    const guards = [];

    let curGuard = 0;
    for (let i = 0; i < events.length; i++) {
        const { body, date } = events[i];

        if (body.includes('Guard')) {
            const id = parseInt(body.split(' ', 2)[1].slice(1), 10);

            if (guards[id] === undefined)
                guards[id] = [];
            
            curGuard = id;

            continue;
        }

        if (body === 'wakes up') {
            const sleep = events[i - 1].date;

            for (let j = sleep.getMinutes(); j < date.getMinutes(); j++)
                guards[curGuard][j] = guards[curGuard][j] + 1 || 1;
        }
    }

    let biggest = { id: -1, min: -1 };
    for (let id = 0; id < guards.length; id++) {
        const guard = guards[id];

        if (guard === undefined)
            continue;

        const min = guard.reduce((acc, cur) => acc += cur, 0);

        if (min > biggest.min)
            biggest = { id, min };
    }

    let minute = -1;
    let totalSlept = -1;
    for (let i = 0, g = guards[biggest.id]; i < g.length; i++) {
        if (g[i] > totalSlept) {
            minute = i;
            totalSlept = g[i];
        }
    }

    return minute * biggest.id;
}

console.log(solve(rawInput));
