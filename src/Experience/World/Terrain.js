import {
  DoubleSide,
  LuminanceFormat,
  Mesh,
  Color,
  Vector3,
  MeshBasicMaterial,
  ShaderMaterial,
  sRGBEncoding,
  RGBFormat,
  PerspectiveCamera,
  RGBAFormat,
} from 'three';

import Experience from '../index.js';
import RiverMaterial from '../../shaders/river';

import landscapeVertexShader from '../../shaders/landscape/vert.glsl';
import landscapeFragmentShader from '../../shaders/landscape/frag.glsl';

export default class Terrain {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.objects = [];

    if (this.experience.debug.active) {
      this.debug = this.experience.debug;

      this.setDebug();
    }

    this.setModel();
    this.traverseModel();
    this.addToScene();
  }

  setModel() {
    this.model = this.resources.items['terrainModel'];
  }

  update() {
    for (let obj of this.objects) {
      if (obj.material.uniforms) {
        obj.material.uniforms.uTime.value =
          this.experience.clock.elapsed / 1000;
      }
    }
  }

  traverseModel() {
    this.islands = [];

    // var islandsLightmap = this.resources.items['islandsLightMap'];
    // islandsLightmap.flipY = false;
    // islandsLightmap.format = LuminanceFormat;

    // var detailsLightmap = this.resources.items['detailsLightMap'];
    // detailsLightmap.flipY = false;
    // detailsLightmap.format = LuminanceFormat;

    // var roundTreesLightmap = this.resources.items['roundTreesLightMap'];
    // roundTreesLightmap.flipY = false;
    // roundTreesLightmap.format = LuminanceFormat;

    // var tallTreesLightmap = this.resources.items['tallTreesLightMap'];
    // tallTreesLightmap.flipY = false;
    // tallTreesLightmap.format = LuminanceFormat;

    // var looseTreesLightmap = this.resources.items['looseTreesLightMap'];
    // looseTreesLightmap.flipY = false;
    // looseTreesLightmap.format = LuminanceFormat;

    this.model.scene.traverse((child) => {
      if (child instanceof Mesh) {
        if (
          ['bake1', 'bake2', 'bake3', 'bake4', 'bake5', 'bake6'].includes(
            child.name
          )
        ) {
          let tex = this.resources.items[child.name];

          tex.flipY = false;
          tex.format = RGBFormat;

          child.material = child.material = new ShaderMaterial({
            vertexShader: landscapeVertexShader,
            fragmentShader: landscapeFragmentShader,
            toneMapped: true,
            transparent: false,
            uniforms: {
              uWind: { value: 0 },
              uTime: { value: 0 },
              uColor: { value: new Color('#fff') },
              uFogColor: { value: new Color('#d0f5df') },
              uFogDensity: { value: 0.012 },
              uFogHeightFactor: { value: 0.075 },
              uLightmapIntensity: { value: 1 },
              uLightmap: { type: 't', value: tex },
            },
          });

          if (child.name === 'bake1') {
            child.position.y -= 0.03;
          }
        }

        if (child.name === 'river') {
          child.material = RiverMaterial;
          child.name = 'water';
          child.material.uniforms.uColor.value.setStyle('#5b63d4');
          this.experience.state.intersectObjects.push(child);

          this.river = child;
        }

        if (child.name.includes('raycast')) {
          this.experience.state.intersectObjects.push(child);
          child.visible = false;
        }

        this.objects.push(child);
      }
    });
  }

  setDebug() {
    this.debugFolder = this.debug.pane.addFolder({
      title: 'Terrain',
      expanded: false,
    });

    this.debugParams = {
      beach: '#ffd191',
      islands: '#8eff75',
      roundTrees: '#5cc778',
      pineTrees: '#111D13',
      looseTrees: '#badf73',
      tallTrees: '#41ff4e',
      logs: '#996828',
      rocks: '#8b8bb3',
      soil: '#3d301c',
      river: '#5b63d4',
      marshland: '#152200',
      agriculture: '#ffd900',
      FogDensity: 0.1,
      FogHeightFactor: 0.075,
    };

    this.fogFolder = this.debugFolder.addFolder({
      title: 'Fog',
      expanded: false,
    });

    this.fogFolder
      .addInput(this.debugParams, 'FogDensity', { step: 0.001 })
      .on('change', (e) => {
        this.objects.forEach((obj) => {
          if (obj instanceof Mesh && obj.material.uniforms.uFogDensity) {
            obj.material.uniforms.uFogDensity.value = e.value;
          }
        });
      });

    this.fogFolder
      .addInput(this.debugParams, 'FogHeightFactor')
      .on('change', (e) => {
        this.objects.forEach((obj) => {
          if (obj instanceof Mesh && obj.material.uniforms.uFogHeightFactor) {
            obj.material.uniforms.uFogHeightFactor.value = e.value;
          }
        });
      });

    this.debugFolder
      .addInput(this.debugParams, 'islands', {
        picker: 'inline',
      })
      .on('change', (e) => {
        for (let island of this.islands) {
          island.material.uniforms.uColor.value.setStyle(e.value);
        }
      });

    this.debugFolder
      .addInput(this.debugParams, 'roundTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.roundLeaves.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'river', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.river.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'pineTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.pineLeaves.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'looseTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.looseLeaves.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'tallTrees', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.tallLeaves.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'logs', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.logs.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'rocks', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.rocks.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'soil', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.soil.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'agriculture', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.agriculture.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'marshland', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.marshland.material.uniforms.uColor.value.setStyle(e.value);
      });

    this.debugFolder
      .addInput(this.debugParams, 'beach', {
        picker: 'inline',
      })
      .on('change', (e) => {
        this.beach.material.uniforms.uColor.value.setStyle(e.value);
        this.smallIsland.material.uniforms.uColor.value.setStyle(e.value);
      });
  }

  addToScene() {
    this.experience.scene.add(this.model.scene);
  }
}
