import { AnimationMixer, Mesh } from 'three';
import Experience from '..';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.clock = this.experience.clock;

    this.resource = this.resources.items['foxModel'];
    this.setModel();
    this.setAnimations();

    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugParams = {};

      this.debugFolder = this.debug.pane.addFolder({
        title: 'Fox',
        expanded: false,
      });

      this.debugFolder
        .addButton({
          title: 'Play Idle',
        })
        .on('click', () => {
          this.animations.play('idle');
        });

      this.debugFolder
        .addButton({
          title: 'Play Walking',
        })
        .on('click', () => {
          this.animations.play('walking');
        });

      this.debugFolder
        .addButton({
          title: 'Play Running',
        })
        .on('click', () => {
          this.animations.play('running');
        });
    }

    return this;
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimations() {
    this.animationMixer = new AnimationMixer(this.model);
    this.animations = {
      idle: this.animationMixer.clipAction(this.resource.animations[0]),
      walking: this.animationMixer.clipAction(this.resource.animations[1]),
      running: this.animationMixer.clipAction(this.resource.animations[2]),
      current: null,
      play: (name) => {
        const newAction = this.animations[name];
        const oldAction = this.animations.current;

        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 1);

        this.animations.current = newAction;
      },
    };

    this.animations.current = this.animations.walking;
    this.animations.current.play();
  }

  update() {
    this.animationMixer.update(this.clock.delta * 0.001);
  }
}
