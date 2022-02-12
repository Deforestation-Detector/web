import { Vector2, Vector3 } from 'three';
import Experience from '..';

const v = new Vector3();
const negZ = new Vector3(0, 0, -1);

export default class Controls {
  constructor(camera, canvas) {
    this.experience = new Experience();

    this.camera = camera;
    this.canvas = canvas;

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.lerpedRotation = new Vector3();
    this.mouse = new Vector2();
    this.dragging = false;

    this.keys = {
      left: false,
      up: false,
      right: false,
      down: false,
    };

    this.position.copy(this.camera.position);
    this.camera.rotation.toVector3(this.rotation);
    this.camera.rotation.toVector3(this.lerpedRotation);

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

        v.copy(negZ).applyQuaternion(this.camera.quaternion);
        v.y = 0;
        v.normalize();

        v.multiplyScalar(dy * 20);
        this.position.add(v);

        this.rotation.y += dx;

        this.mouse.set(x, y);
      }
    });

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a': {
          this.keys.left = true;
          break;
        }
        case 'ArrowLeft': {
          this.keys.left = true;
          break;
        }
        case 'w': {
          this.keys.up = true;
          break;
        }
        case 'ArrowUp': {
          this.keys.up = true;
          break;
        }
        case 'd': {
          this.keys.right = true;
          break;
        }
        case 'ArrowRight': {
          this.keys.right = true;
          break;
        }
        case 's': {
          this.keys.down = true;
          break;
        }
        case 'ArrowDown': {
          this.keys.down = true;
          break;
        }
        case 'p': {
          this.position.y -= 5;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'a': {
          this.keys.left = false;
          break;
        }
        case 'ArrowLeft': {
          this.keys.left = false;
          break;
        }
        case 'w': {
          this.keys.up = false;
          break;
        }
        case 'ArrowUp': {
          this.keys.up = false;
          break;
        }
        case 'd': {
          this.keys.right = false;
          break;
        }
        case 'ArrowRight': {
          this.keys.right = false;
          break;
        }
        case 's': {
          this.keys.down = false;
          break;
        }
        case 'ArrowDown': {
          this.keys.down = false;
          break;
        }
      }
    });
  }

  update() {
    if (this.keys.up) {
      v.copy(negZ).applyQuaternion(this.camera.quaternion);
      v.y = 0;
      v.normalize();

      // v.multiplyScalar(0.1);
      this.position.add(v);
    }
    if (this.keys.down) {
      v.copy(negZ).applyQuaternion(this.camera.quaternion);
      v.y = 0;
      v.normalize();

      // v.multiplyScalar(0.1);
      this.position.sub(v);
    }
    if (this.keys.left) {
      this.rotation.y += 0.025;
    }
    if (this.keys.right) {
      this.rotation.y -= 0.025;
    }

    this.camera.position.lerp(this.position, 0.025);

    this.lerpedRotation.lerp(this.rotation, 0.1);
    this.camera.rotation.setFromVector3(this.lerpedRotation);
  }
}
