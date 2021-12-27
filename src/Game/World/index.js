import Game from "..";
import { EVENTS, GAME_MODES } from "../../constants";
import StartMenu from "./Menus/StartMenu";
import levelsList from "./Levels/list";
import EventEmitter from "../Utils/EventEmitter";
import PauseMenu from "./Menus/PauseMenu";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.game = new Game();
    this.scene = this.game.scene;
    this.resources = this.game.resources;
    this.level = null; // null | { instance: level instance, number: number }
    this.levelsCount = Object.keys(levelsList).length;
    this.gameMode = null;
    this.startMenu = new StartMenu(this);
    this.pauseMenu = new PauseMenu();

    this.resources.on(EVENTS.READY, () => {
      // Hide loader and show start menu
      const loader = document.querySelector("#game-loader");
      loader.style.display = "none";

      this.startMenu.openMenu();
    });

    this.startMenu.on(EVENTS.CAMPAIGN_STARTED, () => {
      this.loadLevel(1);
    });

    // TODO: Levels will fire a 'levelFinished' event which the World will listen for
    // When this event is fired, increase this.level and load the coresponding level
    // ____________on a second thought, this will probably be done in the update method below
    // Nope, update is for updating on every frame, I need a listener for when the campaign starts and when a level finishes
  }

  loadLevel(num) {
    this.level = {
      number: num,
      instance: new levelsList[num](),
    };
  }

  update() {
    if (this.level) this.level.instance.update(); // TODO: this only takes care of updating the campaign
  }
}
