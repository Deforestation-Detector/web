import { Group } from 'three';
import Experience from '../..';
import Tile from './Tile';

export default class Tiles {
  constructor(gridSize = 3) {
    this.experience = new Experience();

    this.resources = this.experience.resources.items;

    this.setGroup(gridSize);
  }

  setGroup(gridSize) {
    this.group = new Group();

    let gridMiddle = gridSize * 0.5;

    for (let ix = 0; ix < gridSize; ix++) {
      for (let iy = 0; iy < gridSize; iy++) {
        // grab proper texture for grid position
        let tex = this.resources[`tile${iy + 1}${ix + 1}`];
        let heightmap = this.resources[`tileHeight${iy + 1}${ix + 1}`];

        let tile = new Tile(
          [ix - gridMiddle + 0.5, 0, iy - gridMiddle + 0.5],
          tex,
          heightmap
        );

        this.group.add(tile.mesh);
      }
    }

    this.group.scale.set(5, 5, 5);
    this.experience.scene.add(this.group);
  }
}
