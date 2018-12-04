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

            for (let j = sleep.getMinutes(); j < date.getMinutes(); j++) {
                if (guards[curGuard][j])
                    guards[curGuard][j]++
                else guards[curGuard][j] = 1;
            }
        }
    }

    let total = -1;
    let guard = -1;
    let minute = -1;

    for (let gid = 0; gid < guards.length; gid++) {
        if (guards[gid] === undefined)
            continue;
        
        for (let min = 0; min < guards[gid].length; min++) {
            if (guards[gid][min] > total) {
                guard = gid;
                minute = min;
                total = guards[gid][min];
            }
        }
    }

    return guard * minute;
}

console.log(solve(rawInput));
