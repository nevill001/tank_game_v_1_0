import { Player } from "./classes/player.js";
import { Store } from "./classes/store.js";
import { Maps } from "./levels/map.js";
import { A_Star } from "./utils/dejkstra_a_star.js";

export class Game {
  constructor(main, level, limit) {
    this.main = main;
    this.context = main.context;
    this.widht = main.screen_width;
    this.height = main.screen_height;
    this.program_switcher = main.menu_switcher;
    this.current_level = level;
    this.game_scale = 24;
    this.delay = 0;
    this.delay_limit = 1000;
    this.enemy_limit = limit;
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
    this.store = new Store(this);
    this.map = new Maps(this);
    this.player = new Player(this);
    this.path_finder = new A_Star(this);
  }

  update() {
    this.delay = this.delay % this.delay_limit;
    this.delay++;
    this.player.updatePosition();
    this.store.update();
    if (this.player.health < 1) {
      this.main.menu_switcher = true;
      this.main.game = false;
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.widht, this.height);
    this.map.draw();
    this.player.draw();
    this.store.draw();
  }
}
