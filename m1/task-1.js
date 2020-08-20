import rl from 'readline';

const realLine = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

realLine.on('line', (line) => {
    realLine.output.write(`${line.split('').reverse().join('')}\n\n`);
});
