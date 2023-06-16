import { distanceBeetwenTwoPoints } from "../utils/distance.js";
import { ProjectTile } from "./projectTile.js";

export class Store {
  constructor(main) {
    this.main = main;
    this.context = this.main.context;
    this.scale = this.main.game_scale;
    this.projectTile = [];
    this.enamy = [];
  }

  add_project_tile(x, y, direct) {
    if (direct == 0) {
      y -= 0.3;
    }
    if (direct == 1) {
      y += 0.3;
    }
    if (direct == 2) {
      x -= 0.3;
    }
    if (direct == 2) {
      x += 0.3;
    }
    this.projectTile.push(
      new ProjectTile(
        this,
        Math.floor(x * this.scale),
        Math.floor(y * this.scale),
        direct
      )
    );
  }

  check_project_tile(item, index) {
    this.main.map.level_concreteBlocksArray.forEach((elem) => {
      let distance = distanceBeetwenTwoPoints(
        item.x,
        item.y,
        elem.x * this.scale,
        elem.y * this.scale
      );
      if (distance < 14) {
        this.projectTile.splice(index, 1);
        return;
      }
    });
  }

  update() {
    let index = 0;
    this.projectTile.forEach((elem) => {
      elem.update();
      this.check_project_tile(elem, index);
      index++;
    });
  }

  draw() {
    this.projectTile.forEach((elem) => elem.draw());
  }
}
