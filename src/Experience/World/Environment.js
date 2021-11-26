import { DirectionalLight, sRGBEncoding } from 'three';
import Experience from '..';

export default class Environment {
  constructor() {
    // grab singleton class instance
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setSun();
    this.setEnvMap();

    return this;
  }

  setSun() {
    this.sun = new DirectionalLight('#ffffff', 4);
    this.sun.castShadow = true;
    this.sun.shadow.camera.far = 15;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.normalBias = 0.05;
    this.sun.position.set(3, 3, -2.25);
    this.scene.add(this.sun);
  }

  setEnvMap() {
    this.envMap = {
      intensity: 0.4,
      texture: this.resources.items['envMapTexture'],
    };

    this.envMap.texture.encoding = sRGBEncoding;

    this.scene.environment = this.envMap.texture;
  }
}
