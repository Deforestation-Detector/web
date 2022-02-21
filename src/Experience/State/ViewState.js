import Experience from '..';

export default class ViewState {
  #currentView; // private so that we can only change via setView()

  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.#currentView = 'loading';
    this.views = ['loading', 'landing', 'exploring', 'about', 'investigate', 'signalExplore'];

    this.viewingTile;

    this.setDomElements();
    this.setEventHandlers();
  }


  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      learnMoreNav: document.getElementById("learnMoreNavLink"), //navigation bar
      learnMoreLan: document.getElementById("learnMoreBtn"), //landing page
      aboutBack: document.getElementById("aboutBack"), //learn more back button
      exploreBtn: document.getElementById("exploreBtn"), //explore button into map component
      
    };
  }


  setEventHandlers() {
    // Event Handler for Learn More Button
    this.state.domElements.learnMoreNav.onclick = () => { //condense
      this.state.trigger("learnMorePage");
    };
    this.state.domElements.learnMoreLan.onclick = () => { // ^
      this.state.trigger("learnMorePage");
    };
    this.state.on("learnMorePage", () => {
      this.state.viewState.setView("about");
    });

    // Event Handler for Moving from About to Explore
    this.state.domElements.aboutBack.onclick = () => {
      this.state.trigger("aboutToExplore");
    };
    this.state.on("aboutToExplore", () => {
      this.state.viewState.setView("landing");
      this.state.viewState.setView("exploring");
    });

   // Eveent Handler for Moving into Exploration Page
    this.state.domElements.exploreBtn.onclick = () => {
      this.state.trigger("exploration");
    };
    this.state.on("exploration", () => {
      this.state.viewState.setView("signalExplore"); 
      this.state.viewState.setView("exploring");
    });

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
        setTimeout( () => { //delayed scroll to top before removing learn more page
          this.state.domElements.learnMore.scrollTop = 0; }, 500); 

        this.state.domElements.infoPage.classList.remove('in');
        this.state.domElements.backdrop.classList.remove('in');
        this.state.domElements.learnMore.classList.remove('in');
        this.state.domElements.header.classList.add('in');

        if (this.state.domElements.backdrop.classList.contains('exploring')) //see if started exploring before adding labels
          this.state.domElements.labelListWrapper.classList.add('in'); //else pops up after exiting learn more page from landing

        break;
      }
      case 'about': {
        this.state.domElements.learnMore.classList.add('in');
        this.state.domElements.backdrop.classList.add('in');
        this.state.domElements.landingPage.classList.remove('in');
        this.state.domElements.labelListWrapper.classList.remove('in');

        break;
      }
      case 'signalExplore': { //Meant to singal we started exploring, temp fix
        this.state.domElements.landingPage.classList.remove('in');
        this.state.domElements.backdrop.classList.add('exploring');
        this.state.domElements.landingPage.classList.add('exploring');

        break;
      }
      default: {
        break;
      }
    }
  }
}
