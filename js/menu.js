import { Game } from "./game.js";

export class Menu {
  constructor(context, width, height) {
    this.context = context;
    this.screen_width = width;
    this.screen_height = height;
    this.menu_switcher = true;
    this.game = false;
    this.menu_counter = 1;
    this.animation_game_over;
    this.menu_array = this.get_menu();
    this.menu_current_array = [];
    this.array;
    this.menu_step = 34;
    this.i = 1;
    this.inition();
  }

  inition() {
    this.menu_current_array.push(this.menu_array);
    this.array = this.menu_current_array[this.menu_current_array.length - 1];
    document.addEventListener("keydown", (evnt) => {
      if (this.menu_switcher) {
        this.control_menu(evnt);
      }
    });
  }

  update() {
    if (this.menu_switcher) {
      this.draw();
    } else {
      this.game.update();
      this.game.draw();
    }
  }

  draw() {
    let string = "";
    this.context.clearRect(0, 0, this.screen_width, this.screen_height);
    this.context.font = `${this.menu_step - 2}px arial`;
    string = this.array[0];
    this.context.fillText(string, 220, 220);
    this.context.font = `${this.menu_step - 10}px arial`;
    for (let i = 1; i < this.array.length; i++) {
      string = this.array[i];
      if (i == this.menu_counter) {
        this.context.fillStyle = "red";
      }
      if (Array.isArray(string)) {
        string = this.array[i][0];
      }
      if (string instanceof Object && !Array.isArray(string)) {
        string = string.name;
      }
      this.context.fillText(string, 200, 220 + this.menu_step * i);
      this.context.fillStyle = "black";
    }
  }

  control_menu(evnt) {
    let code = evnt.key;
    let len = this.array.length - 1;
    if (code == "ArrowUp") {
      this.menu_counter -= 1;
    }
    if (code == "ArrowDown") {
      this.menu_counter += 1;
    }
    this.menu_counter = Math.max(Math.min(this.menu_counter, len), 1);
    if (code == "Enter") {
      let elem =
        this.menu_current_array[this.menu_current_array.length - 1][
          this.menu_counter
        ];
      if (Array.isArray(elem)) {
        this.menu_current_array.push(elem);
      }
      if (elem instanceof Object && !Array.isArray(elem)) {
        if (elem.name == "game") {
          this.tank_game();
        }
      }
    }
    if (code == "Escape") {
      if (this.menu_current_array.length > 1) {
        this.menu_current_array.pop();
      }
    }
    this.array = this.menu_current_array[this.menu_current_array.length - 1];
  }

  get_menu() {
    return [
      "Main menu",
      ["Nested Menu", "Cheker1", "Cheker2"],
      { name: "game", program: this.tank_game },
    ];
  }

  quit() {
    cancelAnimationFrame(this.animation_game_over);
  }

  tank_game() {
    this.menu_switcher = false;
    this.game = new Game(this);
  }
}
