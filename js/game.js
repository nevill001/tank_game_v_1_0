import { Player } from "./classes/player.js";
import { Store } from "./classes/store.js";
import { Maps } from "./levels/map.js";

export class Game {
  constructor(main) {
    this.main = main;
    this.context = main.context;
    this.widht = main.screen_width;
    this.height = main.screen_height;
    this.program_switcher = main.menu_switcher;
    this.current_level = 2;
    this.game_scale = 24;
    this.init();
  }

  init() {
    document.addEventListener("keydown", (evnt) => {
      if (!this.program_switcher) {
        if (evnt.key == "Escape") {
          this.main.menu_switcher = true;
          this.main.game = false;
        }
      }
    });
    this.map = new Maps(this);
    this.player = new Player(this, 1.5, 1.5);
    this.store = new Store(this);
  }

  update() {
    this.player.updatePosition();
    this.store.update();
  }

  draw() {
    this.context.clearRect(0, 0, this.widht, this.height);
    this.map.draw();
    this.player.draw();
    this.store.draw();
  }
}
