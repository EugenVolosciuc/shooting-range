import * as THREE from "three";

export default class BaseLevel {
  constructor() {
    this.levelGroup = new THREE.Group();
  }

  setLevelGroupToScene() {
    this.scene.add(this.levelGroup);
  }

  destroy() {}
}
