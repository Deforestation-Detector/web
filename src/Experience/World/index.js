import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import Experience from '..';
import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';

export default class World {
  constructor() {
    // retrieve singleton instance of Experience
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.fox = new Fox();
    });

    return this;
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
