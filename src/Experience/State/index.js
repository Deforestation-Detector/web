import Experience from '..';
import EventEmitter from '../Utils/EventEmitter';
import ViewState from './ViewState';
import LandingState from './LandingState';
import LabelState from './LabelState';
import AboutState from './AboutState';
import ExploreState from './ExploreState';
import BackdropState from './BackdropState';
import CursorState from './CursorState';

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

    this.domElements = {};
    this.intersectObjects = [];
    this.mobile = false;

    this.experience = new Experience();
    this.setDomElements();
  }

  init() {
    this.viewState = new ViewState();
    this.landingState = new LandingState();
    this.labelState = new LabelState();
    this.aboutState = new AboutState();
    this.exploreState = new ExploreState();
    this.backdropState = new BackdropState();
    this.cursorState = new CursorState();
  }

  setDomElements() {
    this.domElements = {
      content: document.getElementById('content'),
      loadPage: document.getElementById('loadpage'),
    };
  }
}
