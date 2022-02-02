import {
  DoubleSide,
  LuminanceFormat,
  Mesh,
  MeshBasicMaterial,
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
    // this.setMaterials();
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

    var islandsLightmap = this.resources.items['islandsLightMap'];
    islandsLightmap.flipY = false;

    var detailsLightmap = this.resources.items['detailsLightMap'];
    detailsLightmap.flipY = false;

    var roundTreesLightmap = this.resources.items['roundTreesLightMap'];
    roundTreesLightmap.flipY = false;
    roundTreesLightmap.format = LuminanceFormat;

    var tallTreesLightmap = this.resources.items['tallTreesLightMap'];
    tallTreesLightmap.flipY = false;

    var looseTreesLightmap = this.resources.items['looseTreesLightMap'];
    looseTreesLightmap.flipY = false;

    this.model.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        ['large_island', 'top_of_large_island', 'medium_island'].includes(
          child.name
        )
      ) {
        child.material = new MeshBasicMaterial({
          color: '#82DD40',
          lightMap: islandsLightmap,
        });

        this.islands.push(child);
      } else if (child instanceof Mesh && child.name === 'beach') {
        child.material = new MeshBasicMaterial({
          color: '#F2C078',
          lightMap: islandsLightmap,
        });

        this.beach = child;
      } else if (child instanceof Mesh && child.name === 'small_island') {
        child.material = new MeshBasicMaterial({
          color: '#F2C078',
          lightMap: islandsLightmap,
        });

        this.smallIsland = child;
      } else if (child instanceof Mesh && child.name === 'river') {
        child.material = new MeshBasicMaterial({
          color: '#3333ff',
          lightMap: detailsLightmap,
        });

        this.river = child;
      } else if (child instanceof Mesh && child.name === 'pine_leaves') {
        child.material = new MeshBasicMaterial({
          color: '#111D13',
          lightMap: detailsLightmap,
        });

        this.pineLeaves = child;
      } else if (child instanceof Mesh && child.name === 'logs') {
        child.material = new MeshBasicMaterial({
          color: '#3A1E03',

          lightMap: detailsLightmap,
          lightMapIntensity: 2,
        });

        this.logs = child;
      } else if (child instanceof Mesh && child.name === 'round_leaves') {
        child.material = new MeshBasicMaterial({
          color: '#5CC75F',
          lightMap: roundTreesLightmap,
          lightMapIntensity: 2,
        });

        this.roundLeaves = child;
      } else if (child instanceof Mesh && child.name === 'tall_leaves') {
        child.material = new MeshBasicMaterial({
          color: '#3fff45',
          lightMap: tallTreesLightmap,
          lightMapIntensity: 2,
        });

        this.tallLeaves = child;
      } else if (
        child instanceof Mesh &&
        ['road', 'rocks'].includes(child.name)
      ) {
        child.material = new MeshBasicMaterial({
          color: '#777788',
          lightMap: detailsLightmap,
        });

        if (child.name === 'rocks') {
          child.material.side = DoubleSide;
        }

        this.rocks = child;
      } else if (child instanceof Mesh && child.name === 'soil') {
        child.material = new MeshBasicMaterial({
          color: '#3d301c',
          lightMap: detailsLightmap,
        });

        this.soil = child;
      } else if (child instanceof Mesh && child.name === 'house') {
        child.material = new MeshBasicMaterial({
          color: '#bbb',
          lightMap: detailsLightmap,
        });

        this.house = child;
      } else if (child instanceof Mesh && child.name === 'roof') {
        child.material = new MeshBasicMaterial({
          color: '#333',
          lightMap: detailsLightmap,
        });

        this.roof = child;
      } else if (child instanceof Mesh && child.name === 'agriculture') {
        child.material = new MeshBasicMaterial({
          color: '#ffd900',
          lightMap: detailsLightmap,
        });

        this.agriculture = child;
      } else if (child instanceof Mesh && child.name === 'loose_leaves') {
        child.material = new MeshBasicMaterial({
          color: '#88c75c',
          lightMap: looseTreesLightmap,
        });

        this.looseLeaves = child;
      } else if (child instanceof Mesh && child.name === 'marshland') {
        child.material = new MeshBasicMaterial({
          color: '#152200',
          lightMap: islandsLightmap,
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
      islands: '#82DD40',
      roundTrees: '#5CC75F',
      pineTrees: '#111D13',
      looseTrees: '#88c75c',
      tallTrees: '#3fff45',
      logs: '#3A1E03',
      rocks: '#777799',
      soil: '#3d301c',
      marshland: '#152200',
      agriculture: '#ffd900',
    };

    this.debugFolder
      .addInput(this.debugParams, 'islands', {
        picker: 'inline',
      })
      .on('change', (e) => {
        for (let island of this.islands) {
          island.material.color.setStyle(e.value);
        }
      });

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
      .addInput(this.debugParams, 'tallTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.tallLeaves.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'logs', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.logs.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'rocks', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.rocks.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'soil', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.soil.material.color.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'agriculture', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.agriculture.material.color.setStyle(e.value);
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
        this.smallIsland.material.color.setStyle(e.value);
      });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
