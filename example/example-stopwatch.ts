import { Stopwatch} from "../src/index";

const stopwatch = new Stopwatch(1, { seconds: 10 });

stopwatch.on('tick', (seconds) => {
  console.log(`${seconds} seconds remaining`);
});

stopwatch.on('end', () => {
  console.log('Stopwatch ended');
});

stopwatch.start();