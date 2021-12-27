import * as THREE from "three";

import Game from "../..";
import { LIGHTS_MODE } from "../../../constants";
import ShootingRange1 from "../ShootingRanges/1";
import BaseLevel from "./BaseLevel";

export default class Level1 extends BaseLevel {
  constructor() {
    super();
    this.game = new Game();
    this.scene = this.game.scene;

    // Settings
    this.lightsMode = LIGHTS_MODE.ON;
    this.shootingRange = new ShootingRange1(this.levelGroup, this.lightsMode);

    this.setLevelGroupToScene();
  }

  static title = "Let's begin";

  update() {}
}
