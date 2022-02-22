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

    // Reset the state
    this.resetState();

    switch (newView) {
      case 'landing': {
        this.state.landingState.setState();
        break;
      }
      case 'investigate': {
        this.state.labelState.setState();
        break;
      }
      case 'exploring': {
        this.state.exploreState.setState();
        break;
      }
      case 'about': {
        this.state.aboutState.setState();
        break;
      }
      default: {
        break;
      }
    }
  }

  // Removes everything from the page to create a clean slate for state management
  resetState() {
    var elems = document.getElementsByClassName('in');

    while (elems[0]) {
      elems[0].classList.remove('in');
    }

    this.state.domElements.content.classList.add('in');
  }
}
