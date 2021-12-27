import { EVENTS } from "../../constants";
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // 16 because most screens run at 60fps, and the delta for 60fps is around 16

    // We are not firing this.tick() right away,
    // we are waiting for one frame
    // because we set the initial delta to 16
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    window.requestAnimationFrame(() => {
      this.tick();
    });

    this.trigger(EVENTS.TICK);
  }
}
