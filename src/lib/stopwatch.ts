import { EventEmitter } from 'events';

interface StopwatchOptions {
  seconds?: number;
  interval?: number;
}

class Stopwatch extends EventEmitter {
  private seconds: number;
  private interval: number;
  private timer: NodeJS.Timeout | null = null;

  constructor(private id: number, options: StopwatchOptions = {}) {
    super();
    this.seconds = options.seconds ?? 10;
    this.interval = (options.interval || options.interval === 0) ? options.interval : 1000;
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public start(): boolean {
    if (this.started()) {
      return false;
    }

    this.timer = setInterval(() => {
      this.emit('tick', this.seconds);

      if (--this.seconds < 0) {
        this.stop();
        this.emit('end');
      }
    }, this.interval);

    return true;
  }

  public started(): boolean {
    return !!this.timer;
  }

  public restart(): void {
    this.stop();
    this.removeAllListeners('tick');
    this.removeAllListeners('end');
    this.start();
  }
}

class StopwatchManager {
  private static stopwatches: Record<number, Stopwatch> = {};

  public static get(id: number, options: StopwatchOptions = {}): Stopwatch {
    if (!StopwatchManager.stopwatches[id]) {
      StopwatchManager.stopwatches[id] = new Stopwatch(id, options);
      StopwatchManager.stopwatches[id].on('end', () => {
        delete StopwatchManager.stopwatches[id];
      });
    }

    return StopwatchManager.stopwatches[id];
  }
}

export { Stopwatch, StopwatchManager};
