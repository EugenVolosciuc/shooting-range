import Game from "../..";
import { EVENTS, GAME_MODES } from "../../../constants";
import BaseMenu from "./BaseMenu";

export default class StartMenu extends BaseMenu {
  constructor(world) {
    const menuElement = document.querySelector("#start-menu");
    super(menuElement);

    this.game = new Game();
    this.world = world;
    this.menuElement = menuElement;
    this.controls = this.camera.controls;

    // Question: should I remove the event listener when the menu is closed?
    this.menuElement
      .querySelector("#start-menu #start-campaign-btn")
      .addEventListener("click", () => this.startCampaign());
  }

  startCampaign() {
    this.world.level++;
    this.world.gameMode = GAME_MODES.CAMPAIGN;
    this.closeMenu();
    this.controls.lock();

    this.trigger(EVENTS.CAMPAIGN_STARTED);
  }

  startNonStop() {
    this.world.gameMode = GAME_MODES.NON_STOP;
    this.closeMenu();
  }
}
