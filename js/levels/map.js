import { Block } from "../objects/blocks.js";

import { level0Array } from "./level_0.js";
import { level1Array } from "./level_1.js";
import { level2Array } from "./level_2.js";

export class Maps {
  constructor(main) {
    this.main = main;
    this.scale = this.main.game_scale;
    this.screen = main.context;
    this.levels = [];
    this.get_levels();
    this.current_level = this.levels[this.main.current_level];
    this.level_concreteBlocksArray = [];
    this.playerBlocksArray = [];
    this.enemyBlocksArray = [];
    this.spaunerBlocksArray = [];
    this.collision_map = new Map();
    this.get_map();
  }

  get_levels() {
    this.levels.push(level0Array);
    this.levels.push(level1Array);
    this.levels.push(level2Array);
  }

  get_map() {
    let x = 0;
    let y = 0;
    for (let row = 0; row < level1Array.length; row++) {
      x = 0;
      for (let column = 0; column < level1Array[0].length; column++) {
        if (this.current_level[row][column] == 1) {
          this.level_concreteBlocksArray.push(
            new Block(x + 0.5, y + 0.5, this.screen, this.scale)
          );
          this.collision_map.set(x * 100 + y, 1);
        }
        x += 1;
      }
      y += 1;
    }
  }

  draw() {
    this.level_concreteBlocksArray.forEach((elem) => {
      elem.draw();
    });
  }

  colllision(pos) {
    return this.collision_map.has(pos);
  }
}
