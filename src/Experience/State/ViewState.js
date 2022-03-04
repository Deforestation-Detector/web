import Experience from '..';

export default class ViewState {
  #currentView; // private so that we can only change via setView()

  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.#currentView = 'loading';
    this.views = ['loading', 'landing', 'exploring', 'about', 'investigate'];

    this.setHandlers();

    this.viewHistory = ['landing'];
  }

  setHandlers() {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        ['investigate', 'about'].includes(this.#currentView)
      ) {
        this.back();
      }
    });
  }

  setView(newView) {
    if (!this.views.includes(newView)) {
      console.error('Tried to transition to a non-existent view: ', newView);
      return;
    }

    let oldView = this.#currentView; // might be needed

    // this.handleDomChanges(oldView, newView);
    this.viewHistory.push(newView);
    this.#currentView = newView;

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

  getLastView() {
    return this.viewHistory[this.viewHistory.length - 1];
  }

  getView() {
    return this.#currentView;
  }
}
