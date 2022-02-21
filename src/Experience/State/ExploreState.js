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
      exploreBtn: document.getElementById("exploreBtn"), //explore button into map component
      
    };
  }

  setEventHandlers() {
    // Eveent Handler for Explore button
    this.state.domElements.exploreBtn.onclick = () => {
      this.state.trigger('exploration');
    };
    this.state.on('exploration', () => {
      this.state.viewState.setView('exploring');
    });
  }
}
