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
      obj.material.uniforms.uTime.value = this.experience.clock.elapsed;
    }
  }

  traverseModel() {
    this.islands = [];

    var islandsLightmap = this.resources.items['islandsLightMap'];
    islandsLightmap.flipY = false;
    islandsLightmap.format = LuminanceFormat;

    var detailsLightmap = this.resources.items['detailsLightMap'];
    detailsLightmap.flipY = false;
    detailsLightmap.format = LuminanceFormat;

    var roundTreesLightmap = this.resources.items['roundTreesLightMap'];
    roundTreesLightmap.flipY = false;
    roundTreesLightmap.format = LuminanceFormat;

    var tallTreesLightmap = this.resources.items['tallTreesLightMap'];
    tallTreesLightmap.flipY = false;
    tallTreesLightmap.format = LuminanceFormat;

    var looseTreesLightmap = this.resources.items['looseTreesLightMap'];
    looseTreesLightmap.flipY = false;
    looseTreesLightmap.format = LuminanceFormat;

    this.model.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        ['large_island', 'top_of_large_island', 'medium_island'].includes(
          child.name
        )
      ) {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          transparent: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#8eff75') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmapIntensity: { value: 1 },
            uLightmap: { type: 't', value: islandsLightmap },
          },
        });

        this.islands.push(child);
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'beach') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#ffd191') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmapIntensity: { value: 1 },
            uLightmap: { type: 't', value: islandsLightmap },
          },
        });

        this.beach = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'small_island') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#ffd191') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmapIntensity: { value: 1 },
            uLightmap: { type: 't', value: islandsLightmap },
          },
        });

        this.smallIsland = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'river') {
        child.material = RiverMaterial;
        child.material.uniforms.uColor.value.setStyle('#5b63d4');

        this.river = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'pine_leaves') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#111D13') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmapIntensity: { value: 1.25 },
            uLightmap: { type: 't', value: detailsLightmap },
          },
        });

        this.pineLeaves = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'logs') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#996828') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1 },
          },
        });

        this.logs = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'round_leaves') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#5cc778') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: roundTreesLightmap },
            uLightmapIntensity: { value: 2 },
          },
        });

        this.roundLeaves = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'tall_leaves') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new Color('#41ff4e') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uWind: { value: 1 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: tallTreesLightmap },
            uLightmapIntensity: { value: 2 },
          },
        });

        this.tallLeaves = child;
        this.objects.push(child);
      } else if (
        child instanceof Mesh &&
        ['road', 'rocks'].includes(child.name)
      ) {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#8b8bb3') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1.5 },
          },
        });

        if (child.name === 'rocks') {
          child.material.side = DoubleSide;
        }

        this.rocks = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'soil') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#3d301c') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1.5 },
          },
        });

        this.soil = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'house') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#bbb') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1.5 },
          },
        });

        this.house = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'roof') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#333') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1.5 },
          },
        });

        this.roof = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'agriculture') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#ffd900') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: detailsLightmap },
            uLightmapIntensity: { value: 1.5 },
          },
        });

        this.agriculture = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'loose_leaves') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#badf73') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: looseTreesLightmap },
            uLightmapIntensity: { value: 1 },
          },
        });

        this.looseLeaves = child;
        this.objects.push(child);
      } else if (child instanceof Mesh && child.name === 'marshland') {
        child.material = new ShaderMaterial({
          vertexShader: landscapeVertexShader,
          fragmentShader: landscapeFragmentShader,
          toneMapped: true,
          uniforms: {
            uWind: { value: 0 },
            uTime: { value: 0 },
            uColor: { value: new Color('#152200') },
            uFogColor: { value: new Color('#d0f5df') },
            uFogDensity: { value: 0.012 },
            uFogHeightFactor: { value: 0.075 },
            uLightmap: { type: 't', value: islandsLightmap },
            uLightmapIntensity: { value: 1 },
          },
        });

        this.marshland = child;
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
