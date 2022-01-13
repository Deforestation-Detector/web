import Experience from '../..';
import { BoxGeometry, Mesh, MeshBasicMaterial, sRGBEncoding } from 'three';

export default class Tile {
  constructor(position, texture, heightmap) {
    this.experience = new Experience();

    this.setGeometry();
    this.setMaterial(texture);
    this.setMesh(position);
  }

  setGeometry() {
    this.geometry = new BoxGeometry(1, 0.05, 1);
  }

  setMaterial(texture) {
    // texture.flipY = false;
    texture.encoding = sRGBEncoding;
    this.material = new MeshBasicMaterial({ map: texture });
  }

  setMesh(position) {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(...position);
    this.mesh.scale.set(0.95, 1, 0.95);

    this.experience.scene.add(this.mesh);
  }
}
