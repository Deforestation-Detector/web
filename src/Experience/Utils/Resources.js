import EventEmitter from './EventEmitter';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CubeTextureLoader, TextureLoader } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();

    return this;
  }

  setLoaders() {
    this.loaders = {};
    this.loaders = {
      ...this.loaders,
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader(),
      dracoLoader: new DRACOLoader(),
    };

    this.loaders.dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
    );

    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    this.trigger('loaded');

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
