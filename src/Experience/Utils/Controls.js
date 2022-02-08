import { Euler, PerspectiveCamera, Vector2, Vector3 } from 'three';
import Experience from '..';

const v = new Vector3();

export default class Controls {
  constructor(camera, canvas, target) {
    this.experience = new Experience();

    this.camera = camera;
    this.canvas = canvas;

    this.position = new Vector3();
    this.target = new Vector3();
    this.lerpedTarget = new Vector3();
    this.mouse = new Vector2();
    this.dragging = false;

    this.position.copy(this.camera.position);
    if (target) {
      if (target instanceof Vector3) {
        this.camera.lookAt(target);
        this.target.copy(target);
        this.lerpedTarget.copy(target);
      } else {
        this.camera.lookAt(...target);
        this.target.set(...target);
        this.lerpedTarget.set(...target);
      }
    }

    this.setEventHandlers();
  }

  setEventHandlers() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.dragging = true;

      let x = (e.clientX / this.canvas.width) * 2.0 - 1.0;
      let y = (-e.clientY / this.canvas.height) * 2.0 + 1.0;

      this.mouse.set(x, y);
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.dragging = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.dragging) {
        let x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
        let y = (-e.clientY / window.innerHeight) * 2.0 + 1.0;

        let dx = this.mouse.x - x;
        let dy = this.mouse.y - y;

        v.set(
          this.target.x - this.position.x,
          0,
          this.target.z - this.position.z
        );

        v.multiplyScalar(dy * 0.125);
        this.position.add(v);
        this.target.add(v);

        this.mouse.set(x, y);
      }
    });
  }

  update() {
    this.lerpedTarget.lerp(this.target, 0.1);
    this.camera.lookAt(this.lerpedTarget);

    this.camera.position.lerp(this.position, 0.1);

    this.camera.updateProjectionMatrix();
  }
}
