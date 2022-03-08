import Experience from '.';
import { PerspectiveCamera } from 'three';
import Controls from './Utils/Controls';

export default class Camera {
  constructor(fov = 35, near = 0.1, far = 200) {
    // grab singleton instance of Experience
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // set up camera object
    this.setInstance(fov, near, far);
    this.setControls();

    return this;
  }

  setInstance(fov, near, far) {
    this.instance = new PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      near,
      far
    );

    this.instance.position.set(0, 50, 80);
    this.instance.rotation.reorder('YXZ');

    this.instance.lookAt(0, 0, 10);

    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new Controls(this.instance, this.canvas);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
