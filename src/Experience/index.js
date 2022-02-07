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
    let showAr = [ document.getElementById('learnMoreNavLink'),
                   document.getElementById('learnMoreBtn')]
    showAr.forEach(btn => {
        btn.onclick = () => {
          document.getElementById('learnMore').classList.add('in');
          document.getElementById('backdrop').classList.add('in');
          document.getElementById('back').classList.add('in');
          document.getElementById('labelListWrapper').classList.remove('in');
          document.getElementById('landing').classList.remove('in');
        };
    });
  
    let hideAr = [ document.getElementById('learnMoreBackBtn')]
    hideAr.forEach(btn => {
        btn.onclick = () => {
          document.getElementById('learnMore').classList.remove('in');
          document.getElementById('backdrop').classList.remove('in');
          document.getElementById('back').classList.remove('in');
          document.getElementById('landing').classList.add('in');
          // Check to see if we've started exploring before adding the label list
          // Otherwise it pops up after exiting learn more page from landing page
          if (document.getElementById('backdrop').classList.contains('exploring')){
              document.getElementById('labelListWrapper').classList.add('in');
          }
          // Scroll to top after exiting learn more page.
          // Delay is to hide scroll until exit animation is over.
          setTimeout(function() {
            document.getElementById('learnMore').scrollTop =0;
          }, 500);
        };
    });

    /**
     * HANDLE TRANSITION TO/FROM INFO PAGE
     */
     document.getElementById('investigateBtn').onclick = () => {
      document.getElementById('infoPage').classList.add('in');
      document.getElementById('backdrop').classList.add('in');
      document.getElementById('labelListWrapper').classList.remove('in');
    };
    document.getElementById('infoPage').onclick = () => {
      document.getElementById('infoPage').classList.remove('in');
      document.getElementById('backdrop').classList.remove('in');
      document.getElementById('labelListWrapper').classList.add('in');
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
      document.getElementById('labelListWrapper').classList.add('in');
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

    // experimental javascript for label list stuff

    const labels = {
      haze: "This is the description for the haze label.",
      primary: "This is the description for the primary label.",
      agriculture: "This is the description for the haze agriculture.",
      clear: "This is the description for the clear label.",
      water: "This is the description for the water label.",
      habitation: "This is the description for the habitation label.",
      road: "This is the description for the road label.",
      cultivation: "This is the description for the cultivation label.",
      slash_burn: "This is the description for the slash_burn label.",
      cloudy: "This is the description for the cloudy label.",
      partly_cloudy: "This is the description for the partly_cloudy label.",
      conventional_mine: "This is the description for the conventional_mine label.",
      bare_ground: "This is the description for the bare_ground label.",
      artisinal_mine: "This is the description for the artisinal_mine label.",
      blooming: "This is the description for the blooming label.",
      selective_logging: "This is the description for the selective_logging label.",
      blow_down: "This is the description for the blow_down label."
    }
    
    function updateLabels(labelArray){
      let labelListNode = document.getElementById('labelList');
      let infoPageNode = document.getElementById('infoPage');
      // Clear label list and info page
      labelListNode.innerHTML = '';
      infoPageNode.innerHTML = '';
      // Iterate through passed labels
      labelArray.forEach(label => {
        if (label in labels){
          // Add label to list
          let labelToInsert = document.createElement('p');
          labelToInsert.innerHTML = label;
          labelListNode.appendChild(labelToInsert);
    
          // Add label description to info page
          // Create nodes
          let labelWrapper = document.createElement('div');
          let labelTitle = document.createElement('h1');
          let labelDescription = document.createElement('p');
          // Fill nodes
          labelWrapper.classList.add('tileLabel');
          labelTitle.innerHTML = label;
          labelDescription.innerHTML = labels[label];
          labelWrapper.appendChild(labelTitle);
          labelWrapper.appendChild(labelDescription);
    
          // Add label wrapper to info page
          infoPageNode.appendChild(labelWrapper);
        }
      })
    }
    
    document.getElementById('updateLabelsBtn').onclick = () => {
      let testLabels = [];
      var keys = Object.keys(labels);
      for (let i = 0; i < 5; i++){
        testLabels.push(keys[ keys.length * Math.random() << 0]);
      }
      updateLabels(testLabels);
    }