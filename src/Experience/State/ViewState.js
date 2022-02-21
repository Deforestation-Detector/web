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
        this.state.domElements.landingPage.classList.add('in');
        break;
      }
      case 'investigate': {
        this.state.domElements.infoPage.classList.add('in');
        this.state.domElements.backdrop.classList.add('in');

        break;
      }
      case 'exploring': {
        this.state.domElements.backdrop.classList.add('exploring');
        this.state.domElements.header.classList.add('in');
        this.state.domElements.labelListWrapper.classList.add('in');

        break;
      }
      case 'about': {
        this.state.domElements.learnMore.classList.add('in');
        this.state.domElements.backdrop.classList.add('in');

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

    while (elems[0]){
      elems[0].classList.remove('in');
    }

    this.state.domElements.content.classList.add('in');
  }
}
