import Experience from '..';

export default class LandingState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.setDomElements();
    this.setEventHandlers();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      landingPage: document.getElementById('landing'),
    };
  }

  setEventHandlers() {}

  setState() {
    this.state.domElements.landingPage.classList.add('in');
  }
}
