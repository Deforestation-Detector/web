import { Mesh, MeshMatcapMaterial, sRGBEncoding } from 'three';
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
    const grass = this.resources.items['grassMatcap'];
    const sand = this.resources.items['sandMatcap'];
    const water = this.resources.items['waterMatcap'];

    grass.encoding = sRGBEncoding;
    sand.encoding = sRGBEncoding;
    water.encoding = sRGBEncoding;

    this.model.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        ['large_grass', 'small_grass', 'medium_grass'].includes(child.name)
      ) {
        child.material = new MeshMatcapMaterial({
          matcap: grass,
        });
      } else if (
        child instanceof Mesh &&
        ['large_island', 'small_island', 'medium_island'].includes(child.name)
      ) {
        child.material = new MeshMatcapMaterial({
          matcap: sand,
          color: '#333333',
        });
      } else if (child instanceof Mesh && child.name === 'beach') {
        child.material = new MeshMatcapMaterial({
          matcap: sand,
          color: '#eeeeee',
        });
      } else if (child instanceof Mesh && child.name === 'river') {
        child.material = new MeshMatcapMaterial({
          matcap: water,
        });
      }
    });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
