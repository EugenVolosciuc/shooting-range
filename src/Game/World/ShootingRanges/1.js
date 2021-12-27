import Game from "../..";
import ShootingBooth1 from "../ShootingBooths/1";
import BaseShootingRange from "./BaseShootingRange";

const roomSize = {
  width: 6,
  depth: 30,
  height: 3,
};

export default class ShootingRange1 extends BaseShootingRange {
  constructor(levelGroup, lightsMode) {
    super(roomSize, levelGroup, lightsMode);
    this.game = new Game();
    this.scene = this.game.scene;
    this.shootingBooth = new ShootingBooth1(roomSize, levelGroup);
  }
}
