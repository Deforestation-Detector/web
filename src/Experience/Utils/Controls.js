import { Vector2, Vector3 } from 'three';
import Experience from '..';

const v = new Vector3();
const v2 = new Vector3();
const negZ = new Vector3(0, 0, -1);

export default class Controls {
  constructor(camera, canvas) {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.camera = camera;
    this.canvas = canvas;

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.lerpedRotation = new Vector3();
    this.mouse = new Vector2();

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
    this.canvas.addEventListener('pointerdown', (e) => {
      this.handleMouseDown(e);
    });

    this.canvas.addEventListener('touchstart', (e) => {
      this.handleMouseDown(e);
    });

    this.canvas.addEventListener('pointerup', (e) => {
      this.state.cursorState.dragging = false;
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (this.state.cursorState.dragging) {
        this.state.cursorState.setIntersection(null);
        let x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
        let y = (-e.clientY / window.innerHeight) * 2.0 + 1.0;

        let dx = this.mouse.x - x;
        let dy = this.mouse.y - y;

        let dir = Math.abs(dy) - Math.abs(dx);

        if (true || dir > 0) {
          v.copy(negZ).applyQuaternion(this.camera.quaternion);
          v.y = 0;
          v.normalize();

          v.multiplyScalar(dy * (this.state.mobile ? 22.5 : 22));

          v2.copy(this.position).add(v);
          v2.y = 0;

          if (v2.length() <= 100.0) {
            v2.y = this.position.y;
            this.position.copy(v2);
          }
        }

        if (!this.state.mobile || dir <= 0) {
          this.rotation.y -= dx * (this.state.mobile ? 0.35 : 0.75);
        }
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

  handleMouseDown(e) {
    this.state.cursorState.dragging = true;

    let x = (e.clientX / this.canvas.width) * 2.0 - 1.0;
    let y = (-e.clientY / this.canvas.height) * 2.0 + 1.0;

    this.mouse.set(x, y);
  }

  update() {
    if (this.state.viewState.getView() !== 'exploring') return;

    let delta = this.experience.clock.deltaSum;

    if (this.keys.up) {
      v.copy(negZ).applyQuaternion(this.camera.quaternion);
      v.y = 0;
      v.normalize();

      v2.copy(this.position);
      v2.add(v.multiplyScalar((0.625 * delta) / 16));
      v2.y = 0;

      if (v2.length() <= 100.0) {
        v2.y = this.camera.position.y;
        this.position.copy(v2);
      }
    }
    if (this.keys.down) {
      v.copy(negZ).applyQuaternion(this.camera.quaternion);
      v.y = 0;
      v.normalize();

      v2.copy(this.position);
      v2.sub(v.multiplyScalar((0.625 * delta) / 16));
      v2.y = 0;

      if (v2.length() <= 100.0) {
        v2.y = this.camera.position.y;
        this.position.copy(v2);
      }
    }
    if (this.keys.left) {
      this.rotation.y += (0.02 * delta) / 16;
    }
    if (this.keys.right) {
      this.rotation.y -= (0.02 * delta) / 16;
    }

    if (Object.values(this.keys).find((val) => val === true)) {
      this.state.domElements.cursor.classList.add('dragging');
    } else {
      this.state.domElements.cursor.classList.remove('dragging');
    }

    this.camera.position.lerp(this.position, (0.1 * delta) / 16);

    this.lerpedRotation.lerp(this.rotation, (0.1 * delta) / 16);
    this.camera.rotation.setFromVector3(this.lerpedRotation);
  }
}
