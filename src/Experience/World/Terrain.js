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

    if (this.experience.debug.active) {
      this.debug = this.experience.debug;

      this.setDebug();
    }

    this.setModel();
    this.setMaterials();
    this.traverseModel();
    this.addToScene();
  }

  setModel() {
    this.model = this.resources.items['terrainModel'];
  }

  setMaterials() {
    this.water = this.resources.items['waterMatcap'];

    this.water.encoding = sRGBEncoding;
  }

  traverseModel() {
    this.islands = [];

    this.model.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        ['large_island', 'top_of_large_island', 'medium_island'].includes(
          child.name
        )
      ) {
        child.material = new MeshLambertMaterial({
          color: '#82DD40',
        });

        this.islands.push(child);
      } else if (child instanceof Mesh && child.name === 'beach') {
        child.material = new MeshLambertMaterial({
          color: '#F2C078',
        });

        this.beach = child;
      } else if (child instanceof Mesh && child.name === 'river') {
        child.material = new MeshMatcapMaterial({
          matcap: this.water,
        });

        this.river = child;
      } else if (child instanceof Mesh && child.name === 'pine_leaves') {
        child.material = new MeshLambertMaterial({
          color: '#111D13',
        });

        this.pineLeaves = child;
      } else if (child instanceof Mesh && child.name === 'logs') {
        child.material = new MeshLambertMaterial({
          color: '#3A1E03',
        });

        this.logs = child;
      } else if (child instanceof Mesh && child.name === 'round_leaves') {
        child.material = new MeshLambertMaterial({
          color: '#5CC75F',
        });

        this.roundLeaves = child;
      } else if (child instanceof Mesh && child.name === 'road') {
        child.material = new MeshLambertMaterial({
          color: '#777788',
        });

        this.road = child;
      } else if (child instanceof Mesh && child.name === 'loose_leaves') {
        child.material = new MeshLambertMaterial({
          color: '#5CC75F',
        });

        this.looseLeaves = child;
      } else if (child instanceof Mesh && child.name === 'marshland') {
        child.material = new MeshLambertMaterial({
          color: '#152200',
        });

        this.marshland = child;
      }
    });
  }

  setDebug() {
    this.debugFolder = this.debug.pane.addFolder({
      title: 'Terrain',
      expanded: false,
    });

    this.debugParams = {
      beach: '#F2C078',
      roundTrees: '#5CC75F',
      pineTrees: '#111D13',
      looseTrees: '#5CC75F',
      logs: '#3A1E03',
      road: '#777777',
      marshland: '#152200',
    };

    this.debugFolder
      .addInput(this.debugParams, 'roundTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.roundLeaves.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'pineTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.pineLeaves.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'looseTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.looseLeaves.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'logs', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.logs.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'road', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.road.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'marshland', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.marshland.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'beach', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.beach.material.color.setStyle(e.value);
      });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
