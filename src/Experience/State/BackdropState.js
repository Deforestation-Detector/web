import Experience from '..';

export default class BackdropState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.setDomElements();
    this.setHandlers();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      backdrop: document.getElementById('backdrop'), //backdrop
    };
  }

  setHandlers() {
    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'exploring') {
        this.state.domElements.backdrop.classList.remove('in');
      } else {
        this.state.domElements.backdrop.classList.add('in');
      }
    });
  }
}
