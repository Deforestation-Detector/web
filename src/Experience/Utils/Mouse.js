import Experience from '..';

export default class Mouse {
  constructor() {
    this.experience = new Experience();

    this.x = 0;
    this.y = 0;

    this.setListener();
  }

  setListener() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    this.x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
    this.y = -(e.clientY / window.innerHeight) * 2.0 - 1.0;
  }

  dispose() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
}
