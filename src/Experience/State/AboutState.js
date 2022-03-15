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
      learnMore: document.getElementById('learnMore'), //learn more page
      aboutBack: document.getElementById('aboutBack'), //learn more back button
      aboutShadow: document.getElementById('aboutShadow'),
    };
  }

  // Handles removing/adding about page
  setEventHandlers() {
    this.state.domElements.aboutBack.onclick = () => {
      this.state.viewState.back();
    };

    this.state.domElements.learnMore.addEventListener('scroll', (e) => {
      let target = e.target;
      if (target === this.state.domElements.learnMore) {
        if (target.scrollTop > 12.5) { // Finds when we should make shadow dissapear on scroll
          this.state.domElements.aboutShadow.classList.remove('in');
        } else {
          this.state.domElements.aboutShadow.classList.add('in');
        }
      }
    });

    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'about') {
        // this.state.domElements.learnMore.scrollTop = 0;
        // this.state.domElements.learnMore.scrollTop = 0;
        this.state.domElements.learnMore.classList.add('in');
      } else {
        this.state.domElements.learnMore.classList.remove('in');
      }
    });
  }
}
