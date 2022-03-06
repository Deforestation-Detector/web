import EventEmitter from './EventEmitter';

export default class Clock extends EventEmitter {
  constructor() {
    super();

    this.started = performance.now();
    this.current = this.started;
    this.elapsed = 0;
    this.delta = 16; // initial val of 0 causes bugs

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => this.tick());
    }

    return this;
  }

  tick() {
    // upperformance clock
    let cur = performance.now();
    this.delta = cur - this.current;
    this.current = cur;
    this.elapsed = this.current - this.started;

    this.trigger('tick');

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => this.tick());
    }
  }
}
