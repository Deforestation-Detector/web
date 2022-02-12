import Experience from '..';
import EventEmitter from '../Utils/EventEmitter';
import ViewState from './ViewState';

/**
 * The state object maintains the state of our application. Note that it extends from our
 * event emitter class, so it can trigger(eventName) events. Other components can subscribe
 * to these events and perform actions when they are triggered.
 *
 * Imagine we are in Component.js, subscribe like so
 * this.experience.state.on('viewchange', () => console.log('view is changing!'))
 */

export default class State extends EventEmitter {
  constructor() {
    super(); // calls extended class's constructor

    this.experience = new Experience();
    this.setDomElements();

    this.viewState = new ViewState();
  }

  setDomElements() {
    this.domElements = {
      loadingPage: document.getElementById('loadpage'),
      landingPage: document.getElementById('landing'),
    };
  }
}
