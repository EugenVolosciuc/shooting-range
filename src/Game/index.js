import * as THREE from "three";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Resources from "./Utils/Resources";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Debug from "./Utils/Debug";
import World from "./World";
import sources from "./sources";
import { EVENTS } from "../constants";

let instance = null;

export default class Game {
  constructor(canvas) {
    // Make Game a singleton
    if (instance) return instance;
    instance = this;

    // Global access
    window.game = this;

    this.debug = new Debug();
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on(EVENTS.RESIZE, () => {
      this.resize();
    });

    this.time.on(EVENTS.TICK, () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.world.update();
    this.renderer.update();
  }
}
