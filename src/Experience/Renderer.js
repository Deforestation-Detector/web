import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  Mesh,
  PCFSoftShadowMap,
  ReinhardToneMapping,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';
import Experience from '.';

export default class Renderer {
  constructor(shadows = true) {
    // retrieve singleton instance of Experience
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: 'Renderer',
        expanded: false,
      });

      this.debugFolder
        .addButton({ title: 'Filmic Tone Mapping' })
        .on('click', () => {
          this.instance.toneMapping = ACESFilmicToneMapping;
          this.scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      this.debugFolder
        .addButton({ title: 'Reinhard Tone Mapping' })
        .on('click', () => {
          this.instance.toneMapping = ReinhardToneMapping;
          this.scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      this.debugFolder
        .addButton({ title: 'Cineon Tone Mapping' })
        .on('click', () => {
          this.instance.toneMapping = CineonToneMapping;
          this.scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });
    }

    this.setInstance(shadows);

    return this;
  }

  setInstance(shadows) {
    this.instance = new WebGLRenderer({ canvas: this.canvas, antialias: true });

    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = ReinhardToneMapping;
    this.instance.toneMappingExposure = 1.25;
    this.instance.shadowMap.enabled = shadows;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setClearColor('#111118');
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
