import { Menu } from "./js/menu.js";

class Main {
  constructor() {
    this.activeMenuBotton = document.querySelector("#menu2");
    this.buttons = document.querySelectorAll(".menu_buttons");
    this.body_main_sections = document.querySelector(".main_sections");
    this.active = document.querySelector("#menu2");
    this.active_sections = document.querySelector("#main2");
    this.program = false;
    this.canvas = document.querySelector(".canvas");
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.animation_canvas;
    this.click_menu_buttons_listener();
  }

  click_menu_buttons_listener() {
    this.active.style.color = "#fffafa";
    this.active_sections.style.display = "inline-block";
    this.buttons.forEach((elem) => {
      elem.addEventListener("click", (evnt) => {
        this.active.style.color = "#c0c0c0";
        this.active = evnt.target;
        this.active.style.color = "#fffafa";
        let index = evnt.target.id.slice(4);
        this.active_sections.style.display = "none";
        this.active_sections = document.querySelector(`#main${index}`);
        this.active_sections.style.display = "inline-block";
        if (index == 4) {
          this.program = new Menu(
            this.context,
            this.canvas.width,
            this.canvas.height
          );
          run_canvas();
        } else {
          if (this.program) {
            this.program = false;
            stop_canvas();
          }
        }
      });
    });
  }
}

var script = new Main();
let game_over;
function run_canvas() {
  game_over = requestAnimationFrame(run_canvas);
  if (script.program) {
    script.program.update();
  }
}

function stop_canvas() {
  cancelAnimationFrame(game_over);
}
