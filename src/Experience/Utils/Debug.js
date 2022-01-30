import { Pane } from 'tweakpane';
import Stats from 'stats.js';

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
      this.pane = new Pane({ title: 'Config', expanded: false });
    }

    return this;
  }
}
