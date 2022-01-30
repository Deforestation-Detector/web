import {
  Mesh,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  sRGBEncoding,
} from 'three';
import Experience from '../index.js';

export default class Terrain {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.setModel();
    this.setMaterials();
    this.traverseModel();
    this.addToScene();
  }

  setModel() {
    this.model = this.resources.items['terrainModel'];
  }

  setMaterials() {
    this.grass = this.resources.items['grassMatcap'];
    this.sand = this.resources.items['sandMatcap'];
    this.redSand = this.resources.items['redSandMatcap'];
    this.water = this.resources.items['waterMatcap'];
    this.pineLeaves = this.resources.items['pineLeavesMatcap'];
    this.pineWood = this.resources.items['pineWoodMatcap'];
    this.birchLeaves = this.resources.items['birchLeavesMatcap'];
    this.birchWood = this.resources.items['birchWoodMatcap'];

    this.grass.encoding = sRGBEncoding;
    this.sand.encoding = sRGBEncoding;
    this.redSand.encoding = sRGBEncoding;
    this.water.encoding = sRGBEncoding;
    this.pineLeaves.encoding = sRGBEncoding;
    this.pineWood.encoding = sRGBEncoding;
    this.birchLeaves.encoding = sRGBEncoding;
    this.birchWood.encoding = sRGBEncoding;
  }

  traverseModel() {
    this.model.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        ['large_island', 'top_of_large_island', 'medium_island'].includes(
          child.name
        )
      ) {
        child.material = new MeshMatcapMaterial({
          matcap: this.grass,
        });
      } else if (child instanceof Mesh && child.name === 'beach') {
        child.material = new MeshMatcapMaterial({
          matcap: this.sand,
        });
      } else if (child instanceof Mesh && child.name === 'river') {
        child.material = new MeshMatcapMaterial({
          matcap: this.water,
        });
      } else if (child instanceof Mesh && child.name === 'pine_leaves') {
        child.material = new MeshMatcapMaterial({
          matcap: this.pineLeaves,
        });
      } else if (child instanceof Mesh && child.name === 'logs') {
        child.material = new MeshMatcapMaterial({
          matcap: this.pineWood,
        });
      } else if (child instanceof Mesh && child.name === 'round_leaves') {
        child.material = new MeshLambertMaterial({
          color: '#5CC75F',
        });
      } else if (child instanceof Mesh && child.name === 'birch_wood') {
        child.material = new MeshMatcapMaterial({
          matcap: this.birchWood,
        });
      }
    });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
