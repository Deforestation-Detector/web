import { Clock, Debug, Mouse, Resources, Sizes } from './Utils';
import Camera from './Camera';
import Renderer from './Renderer';
import { Mesh, Raycaster, Scene } from 'three';
import World from './World';
import sources from './sources';

export default class Experience {
  constructor(canvas) {
    // singleton class
    if (Experience._instance) {
      return Experience._instance;
    } else {
      Experience._instance = this;
    }

    /**
     * Canvas Element
     */
    this.canvas = canvas ? canvas : document.getElementById('webGL');

    if (!this.canvas) {
      console.error('Could not find canvas element.');
      return;
    }

    /**
     * Debug
     */
    this.debug = new Debug();

    /**
     * Sizes
     */
    this.sizes = new Sizes();

    this.sizes.on('resize', () => {
      this.resize();
    });

    /**
     * Clock
     */
    this.clock = new Clock();

    this.clock.on('tick', () => {
      if (this.debug.active) {
        this.debug.stats.begin();
        this.update();
        this.debug.stats.end();
      } else {
        this.update();
      }
    });

    /**
     * Scene
     */
    this.scene = new Scene();

    /**
     * Camera
     */
    this.camera = new Camera();

    /**
     * Renderer
     */
    this.renderer = new Renderer();

    /**
     * Mouse Coordinates
     */
    this.mouse = new Mouse();

    /**
     * Raycaster
     */
    this.raycaster = new Raycaster();

    /**
     * Resources
     */

    this.resources = new Resources(sources);
    this.resources.on('ready', () => this.init());
    this.resources.on('loaded', () => {
      let el = document.querySelector('#loadpage .percentage');

      el.innerHTML = `${Math.floor(
        (this.resources.loaded / this.resources.toLoad) * 100
      )}%`;
    });

    /**
     * World
     */
    this.world = new World();

    return this;
  }

  init() {
    /**
     *  HANDLE TRANSITIONS TO/FROM LEARN MORE PAGE
     * */
    document.getElementById('learnMoreNavLink').onclick = () => {
      document.getElementById('learnMore').classList.add('in');
      document.getElementById('backdrop').classList.add('in');
      document.getElementById('labelList').classList.remove('in');
    };
    document.getElementById('learnMoreBtn').onclick = () => {
      document.getElementById('learnMore').classList.add('in');
      document.getElementById('backdrop').classList.add('in');
      document.getElementById('landing').classList.remove('in');
    };
    document.getElementById('learnMoreBackBtn').onclick = () => {
      document.getElementById('learnMore').classList.remove('in');
      document.getElementById('backdrop').classList.remove('in');
      document.getElementById('landing').classList.add('in');
      // Check to see if we've started exploring before adding the label list
      // Otherwise it pops up after exiting learn more page from landing page
      if (document.getElementById('backdrop').classList.contains('exploring')){
        document.getElementById('labelList').classList.add('in');
      }
    };

    /**
     * HANDLE TRANSITION TO/FROM INFO PAGE
     */
     document.getElementById('investigateBtn').onclick = () => {
      document.getElementById('infoPage').classList.add('in');
      document.getElementById('backdrop').classList.add('in');
      document.getElementById('labelList').classList.remove('in');
    };
    document.getElementById('infoPage').onclick = () => {
      document.getElementById('infoPage').classList.remove('in');
      document.getElementById('backdrop').classList.remove('in');
      document.getElementById('labelList').classList.add('in');
      document.getElementById('landing').classList.add('in');
    };

    /**
     * HANDLE TRANSITION TO EXPLORE
     */
    document.getElementById('exploreBtn').onclick = () => {
      let landingEl = document.getElementById('landing');
      let backdropEl = document.getElementById('backdrop');

      backdropEl.classList.remove('in');
      landingEl.classList.remove('in');

      backdropEl.classList.add('exploring');
      landingEl.classList.add('exploring');

      document.getElementById('header').classList.add('in');
      document.getElementById('labelList').classList.add('in');
    };

    document.getElementById('loadpage').classList.remove('in');
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.raycaster.setFromCamera(
      { x: this.mouse.x, y: this.mouse.y },
      this.camera.instance
    );
    if (this.world.terrain) {
      this.world.terrain.update();
    }
  }

  destroy() {
    this.sizes.off('resize');
    this.clock.off('tick');

    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();

    this.renderer.instance.dispose();

    this.mouse.dispose();

    if (this.debug.active) {
      this.debug.pane.dispose();
    }
  }
}
