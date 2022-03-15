import Experience from '..';

export default class ViewState {
  #currentView; // private so that we can only change via setView()

  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.#currentView = 'loading';
    this.lastChange = performance.now() / 1000;
    this.views = ['loading', 'landing', 'exploring', 'about', 'investigate'];

    this.setHandlers();

    this.viewHistory = ['landing'];
  }

  // Initializes event handlers for the view state
  setHandlers() {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        ['investigate', 'about'].includes(this.#currentView)
      ) {
        this.back();
      }
    });

    document.addEventListener('animationstart', (e) => {
      if (e.animationName === 'fadein') {
        e.target.style.transform = null;
        e.target.style.touchAction = null;
        e.target.style.pointerEvents = null;
      }
    });

    document.addEventListener('animationend', (e) => {
      if (e.animationName === 'fadeout') {
        if (this.state.viewState.getView() === 'exploring') {
          this.state.domElements.loadPage.style.display = 'none';
          this.state.domElements.landingPage.style.display = 'none';
        } else {
          e.target.style.transform = 'translateY(-200vh)';
          e.target.style.touchAction = 'none';
          e.target.style.pointerEvents = 'none';
        }
      }
    });
  }

  // Sets the view to the passed view if it exists as a valid view
  setView(newView) {
    if (!this.views.includes(newView)) {
      console.error('Tried to transition to a non-existent view: ', newView);
      return;
    }

    if (performance.now() / 1000 - this.lastChange < 0.5) return;

    if (newView === 'exploring') {
      this.state.domElements.content.classList.remove('in');
    } else {
      this.state.domElements.content.classList.add('in');
    }

    let oldView = this.#currentView; // might be needed

    // this.handleDomChanges(oldView, newView);
    this.viewHistory.push(newView);
    this.#currentView = newView;

    this.lastChange = performance.now() / 1000;
    this.experience.state.trigger('viewchange');
  }

  back() {
    // remove current view from hist
    this.viewHistory.pop();

    // pop last view from hist, it will be pushed again after the below code
    let lastView = this.viewHistory.pop();

    // go back to last view
    this.setView(lastView);
  }

  // Returns the previous view
  getLastView() {
    return this.viewHistory[this.viewHistory.length - 1];
  }

  // Returns the current view
  getView() {
    return this.#currentView;
  }
}
