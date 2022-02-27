import Experience from '..';

export default class AboutState {
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
      learnMore: document.getElementById('learnMore'), //learn more page
      aboutBack: document.getElementById('aboutBack'), //learn more back button
    };
  }

  setEventHandlers() {
    // Event Handler for leaving About
    this.state.domElements.aboutBack.onclick = () => {
      this.state.viewState.back();
    };

    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'about') {
        this.state.domElements.learnMore.classList.add('in');
      } else {
        this.state.domElements.learnMore.classList.remove('in');
      }
    });
  }
}
