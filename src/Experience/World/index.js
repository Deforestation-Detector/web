import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import Experience from '..';
import Environment from './Environment';
import Terrain from './Terrain';
export default class World {
  constructor() {
    // retrieve singleton instance of Experience
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.terrain = new Terrain();
    });

    return this;
  }
}
