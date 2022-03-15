import { Mesh } from 'three';
import Experience from '..';

export default class CursorState {
  #intersecting = null;

  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.dragging = false;
    this.lastMove = performance.now();
    this.lastMouseDown = null;

    this.setDomElements();
    this.setHandlers();
    this.setText();
  }

  // Sets the intersecting member to the passed ovject if clickable
  setIntersection(obj) {
    if (obj === null || obj instanceof Mesh) {
      this.#intersecting = obj;
    } else {
      console.error('tried to set an invalid intersection');
    }
  }

  // Retrieves the intersecting member
  getIntersection() {
    return this.#intersecting;
  }

  // Adds the dom elements required by this js file to the dom elements list
  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      cursorWrapper: document.getElementById('cursorWrapper'),
      cursor: document.getElementById('cursor'),
      cursorTextWrapper: document.querySelector('#cursor .wrapper'),
      learnMoreNav: document.getElementById('learnMoreNavLink'),
    };
  }

  // Initializes the event handlers for the cursor
  setHandlers() {
    document.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });

    document.addEventListener('mousedown', (e) => {
      this.handleMouseDown(e);
    });

    document.addEventListener('mouseup', (e) => {
      this.handleMouseUp(e);
    });

    document.addEventListener('touchstart', (e) => {
      this.state.domElements.cursorWrapper.classList.add('mobile');
      this.state.mobile = true;
      this.handleMouseDown(e);
    });

    this.state.on('viewchange', () => {
      this.handleViewChange();
    });

    this.experience.clock.on('tick', () => {
      this.update();
    });

    this.state.on('intersected', () => {
      this.handleIntersection();
    });
  }

  // Handles mouse movement behavior
  handleMouseMove(e) {
    this.state.domElements.cursorWrapper.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;

    if (this.dragging) {
      this.state.domElements.cursor.classList.add('dragging');
    }

    this.state.domElements.cursor.classList.add('moving');
    this.state.cursorState.lastMove = performance.now();

    let x = (e.clientX / window.innerWidth) * 2 - 1;
    let y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.experience.raycaster.setFromCamera(
      { x, y },
      this.experience.camera.instance
    );
    const intersections = this.experience.raycaster.intersectObjects(
      this.state.intersectObjects
    );

    if (intersections.length === 0) {
      this.#intersecting = null;
      this.state.domElements.cursor.classList.remove('intersecting');
      this.experience.canvas.classList.remove('intersecting');
      this.setText();
    } else if (!this.dragging) {
      let name = intersections[0].object.name;

      this.#intersecting = name.replaceAll('raycast', '').toLowerCase();
      this.state.trigger('intersected');
    }
  }

  // Handles mouse click behavior
  handleMouseDown(e) {
    if (this.state.viewState.getView() === 'exploring') {
      this.lastMouseDown = performance.now() / 1000;
    }
  }

  // Handles mouse release behavior
  handleMouseUp(e) {
    let t = performance.now() / 1000;
    let clicked = t - this.lastMouseDown <= 0.5;

    this.state.domElements.cursor.classList.remove('dragging');

    if (this.state.viewState.getView() === 'exploring' && clicked) {
      if (e.target === this.state.domElements.learnMoreNav) {
        this.state.viewState.setView('about');
      } else if (this.#intersecting) {
        this.state.viewState.setView('investigate');
      }
    }
  }

  // Handles dom changes when the view state changes
  handleViewChange() {
    let view = this.state.viewState.getView();

    if (view === 'exploring') {
      this.state.domElements.cursor.classList.add('in');
    } else {
      this.state.domElements.cursor.classList.remove('in');
    }
  }


  handleIntersection() {
    this.state.domElements.cursor.classList.add('intersecting');
    this.experience.canvas.classList.add('intersecting');

    this.setText('Click to learn more.');
  }

  update() {
    let t = performance.now();
    let view = this.state.viewState.getView();

    if ((t - this.lastMove) / 1000 > 2 && view === 'exploring') {
      this.state.domElements.cursor.classList.remove('moving');
    }
  }

  setText(t = 'Use WASD or arrow keys to move.') {
    let text = t
      .split('')
      .map(
        (char, i) =>
          `<span style='transform: rotate(${i * 11.5}deg)'>${char}</span>`
      )
      .join('');

    this.state.domElements.cursorTextWrapper.innerHTML = text;
  }
}
