import { Mesh, MeshMatcapMaterial } from 'three';
import Experience from '../index.js';

export default class Terrain {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.setModel();
    this.setMaterials();
    this.addToScene();
  }

  setModel() {
    this.model = this.resources.items['terrainModel'];
  }

  setMaterials() {
    this.model.scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'grass') {
        child.material = new MeshMatcapMaterial({
          matcap: this.resources.items['grassMatcap'],
          color: '#5cc75f',
        });
      } else if (child instanceof Mesh && child.name === 'sand') {
        child.material = new MeshMatcapMaterial({
          matcap: this.resources.items['sandMatcap'],
          color: '#f2c078',
        });
      }
    });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
