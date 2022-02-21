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
      learnMoreNav: document.getElementById('learnMoreNavLink'), //navigation bar
      learnMoreLan: document.getElementById('learnMoreBtn'), //landing page
      aboutBack: document.getElementById('aboutBack'), //learn more back button
      exploreBtn: document.getElementById('exploreBtn'), //explore button into map component
    };
  }

  setEventHandlers() {
    // Event Handler for Learn More Button
    this.state.domElements.learnMoreNav.onclick = () => {
      //condense
      this.state.trigger('learnMorePage');
    };
    this.state.domElements.learnMoreLan.onclick = () => {
      // ^
      this.state.trigger('learnMorePage');
    };
    this.state.on('learnMorePage', () => {
      this.state.viewState.setView('about');
    });

    // Event Handler for leaving About
    this.state.domElements.aboutBack.onclick = () => {
      this.state.trigger('leftAbout');
    };
    this.state.on('leftAbout', () => {
        //delayed scroll to top before removing learn more page
      setTimeout(() => {
        this.state.domElements.learnMore.scrollTop = 0;
      }, 500);
      // Sets correct state according to where the learn more button was pressed
      if (this.state.domElements.backdrop.classList.contains('exploring')) {
        this.state.viewState.setView('exploring');
      } else {
        this.state.viewState.setView('landing');
      }
    });
  }
}
