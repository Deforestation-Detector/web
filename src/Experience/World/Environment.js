import { DirectionalLight, sRGBEncoding, Color, AmbientLight } from 'three';
import Experience from '..';

const col = new Color('#f8e2ba');
const sunCol = new Color('#ff9329');

export default class Environment {
  constructor() {
    // grab singleton class instance
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    if (this.experience.debug.active) {
      this.debugFolder = this.experience.debug.pane.addFolder({
        title: 'Lighting',
        expanded: false,
      });

      this.debugParams = {
        sky: { r: col.r * 255, g: col.g * 255, b: col.b * 255 },
        sun: { r: sunCol.r * 255, g: sunCol.g * 255, b: sunCol.b * 255 },
        ambientLightIntensity: 0.1,
        ambientLight: { r: 255, g: 255, b: 255 },
      };

      this.debugFolder
        .addInput(this.debugParams, 'sky', { picker: 'inline' })
        .on('change', (e) => {
          col.setRGB(e.value.r / 255, e.value.g / 255, e.value.b / 255);

          this.experience.renderer.instance.setClearColor(col, 1);
        });

      this.debugFolder
        .addInput(this.debugParams, 'sun', { picker: 'inline' })
        .on('change', (e) => {
          sunCol.setRGB(e.value.r / 255, e.value.g / 255, e.value.b / 255);

          this.sun.color.set(sunCol);
        });

      this.debugFolder
        .addInput(this.debugParams, 'ambientLight', { picker: 'inline' })
        .on('change', (e) => {
          this.ambientLight.color.setRGB(
            e.value.r / 255,
            e.value.g / 255,
            e.value.b / 255
          );
        });

      this.debugFolder
        .addInput(this.debugParams, 'ambientLightIntensity')
        .on('change', (e) => {
          this.ambientLight.intensity = e.value;
        });
    }

    this.setAmbient();
    this.setSun();

    return this;
  }

  setAmbient() {
    this.ambientLight = new AmbientLight('#ffffff', 0.2);
    this.scene.add(this.ambientLight);
  }

  setSun() {
    this.sun = new DirectionalLight('#ff9329', 2);
    this.sun.position.set(-100, 20, 0);
    this.scene.add(this.sun);
  }
}
