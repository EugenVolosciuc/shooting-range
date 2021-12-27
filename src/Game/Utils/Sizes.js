import { EVENTS } from "../../constants";
import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.setSizes();

    // Resize event
    window.addEventListener("resize", () => {
      this.setSizes();

      this.trigger(EVENTS.RESIZE);
    });
  }

  setSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
