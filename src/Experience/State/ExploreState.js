import Experience from '..';

export default class ExploreState {
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
      header: document.getElementById('header'),
      labelListWrapper: document.getElementById('labelListWrapper'),
      learnMoreNav: document.getElementById('learnMoreNavLink'),
      investigateBtn: document.getElementById('investigateBtn'),
    };
  }

  setEventHandlers() {
    this.state.domElements.learnMoreNav.onclick = () => {
      this.state.viewState.setView('about');
    };

    // this.state.domElements.investigateBtn.onclick = () => {
    //   this.state.viewState.setView('investigate');
    // };

    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'exploring') {
        this.state.domElements.header.classList.add('in');
        // this.state.domElements.labelListWrapper.classList.add('in');
      } else {
        this.state.domElements.header.classList.remove('in');
        // this.state.domElements.labelListWrapper.classList.remove('in');
      }
    });
  }
}
