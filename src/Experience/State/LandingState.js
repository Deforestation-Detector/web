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
      exploreBtn: document.getElementById('exploreBtn'),
      learnMoreLanding: document.getElementById('learnMoreBtn'),
    };
  }

  // Handles removing/adding landing pge
  setEventHandlers() {
    this.state.domElements.exploreBtn.onclick = () => {
      this.state.viewState.setView('exploring');
    };

    this.state.domElements.learnMoreLanding.onclick = () => {
      this.state.viewState.setView('about');
    };

    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'landing') {
        this.state.domElements.landingPage.classList.add('in');
      } else {
        this.state.domElements.landingPage.classList.remove('in');
      }
    });
  }
}
