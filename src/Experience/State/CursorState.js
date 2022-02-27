import Experience from '..';

export default class CursorState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.dragging = false;
    this.lastMove = performance.now();

    this.setDomElements();
    this.setHandlers();
    this.setText();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      cursor: document.getElementById('cursor'),
      cursorTextWrapper: document.querySelector('#cursor .wrapper'),
    };
  }

  setHandlers() {
    document.addEventListener('mousemove', e => {
      this.state.domElements.cursor.style.top = `${e.clientY}px`;
      this.state.domElements.cursor.style.left = `${e.clientX}px`;

      this.state.domElements.cursor.classList.add('moving');
      this.state.cursorState.lastMove = performance.now();
    });

    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'exploring') {
        this.state.domElements.cursor.classList.add('in');
      } else {
        this.state.domElements.cursor.classList.remove('in');
      }
    });

    this.experience.clock.on('tick', () => {
      let t = performance.now();
      let view = this.state.viewState.getView();

      if ((t - this.lastMove) / 1000 > 2 && view === 'exploring') {
        this.state.domElements.cursor.classList.remove('moving');
      }
    });
  }

  setText() {
    let text = 'Use WASD or arrow keys to move'
      .split('')
      .map(
        (char, i) =>
          `<span style='transform: rotate(${i * 11.5}deg)'>${char}</span>`
      )
      .join('');

    this.state.domElements.cursorTextWrapper.innerHTML = text;
  }
}
