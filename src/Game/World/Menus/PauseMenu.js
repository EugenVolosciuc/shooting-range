import Game from "../..";
import BaseMenu from "./BaseMenu";

export default class PauseMenu extends BaseMenu {
  constructor() {
    const menuElement = document.querySelector("#pause-menu");
    super(menuElement);

    this.game = new Game();
    this.menuElement = menuElement;
    this.controls = this.camera.controls;

    this.menuElement
      .querySelector("#pause-menu #continue-btn")
      .addEventListener("click", () => this.continueGame());

    this.controls.addEventListener("unlock", () => {
      // NOTE: Not sure if I can keep this,
      // as it sometimes throws with "A user gesture is required to request Pointer Lock."
      // document.addEventListener("keyup", (event) => this.handleKeyPress(event)); // <--
      this.openMenu();
    });

    this.controls.addEventListener("lock", () => {
      // Same as above
      // document.removeEventListener("keyup", (event) =>
      //   this.handleKeyPress(event)
      // ); // <--
      this.closeMenu();
    });
  }

  continueGame() {
    this.controls.lock();
  }

  handleKeyPress(event) {
    switch (event.code) {
      case "Escape":
        this.continueGame();
        break;
    }
  }
}
