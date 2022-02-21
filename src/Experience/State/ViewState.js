import Experience from '..';

export default class ViewState {
  #currentView; // private so that we can only change via setView()

  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.#currentView = 'loading';
    this.views = ['loading', 'landing', 'exploring', 'about', 'investigate'];

    this.viewingTile;
  }

  setView(newView) {
    if (!this.views.includes(newView)) return;

    let oldView = this.#currentView; // might be needed

    this.handleDomChanges(oldView, newView);
    this.#currentView = newView;

    this.experience.state.trigger('viewchange');
  }

  getView() {
    return this.#currentView;
  }

  handleDomChanges(oldView, newView) {
    // handle transitions here

    switch (newView) {
      case 'landing': {
        this.state.domElements.landingPage.classList.add('in');
        break;
      }
      case 'investigate': {
        this.state.domElements.infoPage.classList.add('in');
        this.state.domElements.backdrop.classList.add('in');
        this.state.domElements.labelListWrapper.classList.remove('in');
        this.state.domElements.header.classList.remove('in');

        break;
      }
      case 'exploring': {
        this.state.domElements.infoPage.classList.remove('in');
        this.state.domElements.backdrop.classList.remove('in');
        this.state.domElements.learnMore.classList.remove('in');
        this.state.domElements.header.classList.add('in');
        this.state.domElements.labelListWrapper.classList.add('in');

        break;
      }
      default: {
        break;
      }
    }
  }
}
