import Game from "../../";
import EventEmitter from "../../Utils/EventEmitter";

export default class BaseMenu extends EventEmitter {
  constructor(menuElement) {
    super();
    this.game = new Game();
    this.camera = this.game.camera;
    this.menuElement = menuElement;
    this.isOpen = false;
  }

  openMenu() {
    this.menuElement.style.display = "block";
    this.isOpen = true;
  }

  closeMenu() {
    this.menuElement.style.display = "none";
    this.isOpen = false;
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
}
