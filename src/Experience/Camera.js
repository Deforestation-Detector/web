import Experience from '.';
import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  constructor(fov = 35, near = 0.1, far = 100) {
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

    this.instance.position.set(0, 6, 12);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    Camera._controls = this.controls;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
