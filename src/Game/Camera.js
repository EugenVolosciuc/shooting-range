import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

import Game from ".";

export default class Camera {
  constructor() {
    this.game = new Game();
    this.sizes = this.game.sizes;
    this.scene = this.game.scene;
    this.canvas = this.game.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 1.6, 0);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new PointerLockControls(this.instance, document.body);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
