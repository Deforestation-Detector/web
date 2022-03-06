import Experience from '..';
// Import image paths
import agricultureImg from '../../img/labelImages/agriculture.jpeg';
import artisinalMineImg from '../../img/labelImages/artisinal_mine.jpeg';
import bareGroundImg from '../../img/labelImages/bare_ground.jpeg';
import bloomingImg from '../../img/labelImages/blooming.jpeg';
import blowDownImg from '../../img/labelImages/blow_down.jpeg';
import clearImg from '../../img/labelImages/clear.jpeg';
import cloudyImg from '../../img/labelImages/cloudy.jpeg';
import conventionalMineImg from '../../img/labelImages/conventional_mine.jpeg';
import cultivationImg from '../../img/labelImages/cultivation.jpeg';
import habitationImg from '../../img/labelImages/habitation.jpeg';
import hazeImg from '../../img/labelImages/haze.jpeg';
import partlyCloudyImg from '../../img/labelImages/partly_cloudy.jpeg';
import primaryImg from '../../img/labelImages/primary.jpeg';
import roadImg from '../../img/labelImages/road.jpeg';
import selectiveLoggingImg from '../../img/labelImages/selective_logging.jpeg';
import slashBurnImg from '../../img/labelImages/slash_burn.jpeg';
import waterImg from '../../img/labelImages/water.jpeg';

export default class LabelState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.labels = {
      agriculture: {
        headerDescr:
          'Agriculture is the practice of cultivating plants and livestock for the purpose of consumption.',
        labelDescr:
          'While certain levels of agriculture are necessary for survival, large-scale agriculture has been shown to have negative effects on the environment. Clearing forests to make room for agriculture destroys native animal habitation and raising commercial livestock leads to an abundance of extra greenhouse gas production.',
        natural: false,
        url: agricultureImg,
      },
      artisinal_mine: {
        headerDescr:
          'This is the header description for the artisinal mine label.',
        labelDescr:
          'This is the label description for the artisinal mine label.',
        natural: false,
        url: artisinalMineImg,
      },
      bare_ground: {
        headerDescr:
          'This is the header description for the bare ground label.',
        labelDescr: 'This is the label description for the bare ground label.',
        natural: true,
        url: bareGroundImg,
      },
      blooming: {
        headerDescr: 'This is the header description for the blooming label.',
        labelDescr: 'This is the label description for the blooming label.',
        natural: true,
        url: bloomingImg,
      },
      blow_down: {
        headerDescr: 'This is the header description for the blow down label.',
        labelDescr: 'This is the label description for the blow down label.',
        natural: true,
        url: blowDownImg,
      },
      clear: {
        headerDescr: 'This is the header description for the clear label.',
        labelDescr: 'This is the label description for the clear label.',
        natural: true,
        url: clearImg,
      },
      cloudy: {
        headerDescr: 'This is the header description for the cloudy label.',
        labelDescr: 'This is the label description for the cloudy label.',
        natural: true,
        url: cloudyImg,
      },
      conventional_mine: {
        headerDescr:
          'This is the header description for the conventional mine label.',
        labelDescr:
          'This is the label description for the conventional mine label.',
        natural: false,
        url: conventionalMineImg,
      },
      cultivation: {
        headerDescr:
          'Cultivation is the preparing of land to be used for agricultural purposes.',
        labelDescr:
          'Land cultivation is often invasive and destructive. Commonly used fertilizers and pesticides contain chemicals which damage the land and eventually leech and flow into bodies of water, further affecting the wildlife.',
        natural: false,
        url: cultivationImg,
      },
      habitation: {
        headerDescr:
          'Habitation is the construction of living spaces and the dwelling of people in those spaces.',
        labelDescr:
          'Human settlements, especially in the Amazon, are disruptive to the native wildlife and usually space must be cleared for their construction.',
        natural: false,
        url: habitationImg,
      },
      haze: {
        headerDescr: 'This is the header description for the haze label.',
        labelDescr: 'This is the label description for the haze label.',
        natural: true,
        url: hazeImg,
      },
      partly_cloudy: {
        headerDescr:
          'This is the header description for the partly cloudy label.',
        labelDescr:
          'This is the label description for the partly cloudy label.',
        natural: true,
        url: partlyCloudyImg,
      },
      primary: {
        headerDescr: 'This is the header description for the primary label.',
        labelDescr: 'This is the label description for the primary label.',
        natural: true,
        url: primaryImg,
      },
      road: {
        headerDescr:
          'Roads are paths built through the rainforest from one location to another.',
        labelDescr:
          'Roads are essential to allow people to transport food, supplies, and themselves around the rainforest. Unfortunately, building them usually involves clearing out large strips of the rainforest and can disrupt the wildlife.',
        natural: false,
        url: roadImg,
      },
      selective_logging: {
        headerDescr:
          'This is the header description for the selective logging label.',
        labelDescr:
          'This is the label description for the selective logging label.',
        natural: false,
        url: selectiveLoggingImg,
      },
      slash_burn: {
        headerDescr: 'This is the header description for the slash burn label.',
        labelDescr: 'This is the label description for the slash burn label.',
        natural: false,
        url: slashBurnImg,
      },
      water: {
        headerDescr: 'Water is the life force of the rainforest.',
        labelDescr: `Water is an important component of rainforests, sustaining the varied plant life and animals. The Amazon is home to the Amazon River, the largest river by discharge volume of water in the world.\n\nWater is an important component of rainforests, sustaining the varied plant life and animals. The Amazon is home to the Amazon River, the largest river by discharge volume of water in the world.`,
        natural: true,
        url: waterImg,
      },
    };

    this.labelList = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

    this.setDomElements();
    this.setEventHandlers();
    this.initializeImages();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      backdrop: document.getElementById('backdrop'),
      infoPage: document.getElementById('infoPage'),
      closeBtn: document.querySelector('.closeBtn'),
      layeredImgs: document.getElementById('layeredImgs'),

      infoHeaderTitle: document.querySelector('.infoHeaderTitle'),
      infoHeaderDescr: document.querySelector('.infoHeaderDescr'),
      labelDescription: document.querySelector('.labelDescription'),
    };
  }

  setEventHandlers() {
    // Event Handler for clicking on close button
    this.state.domElements.closeBtn.onclick = () => {
      this.state.viewState.back();
    };

    // Event Handler for handling state change
    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'investigate') {
        // Update the label
        let element = this.state.cursorState.getIntersection();
        this.updateLabel(element);
        // Set the state
        this.state.domElements.backdrop.classList.add('in');
        this.state.domElements.infoPage.classList.add('in');
      } else {
        this.state.domElements.backdrop.classList.remove('in');
        this.state.domElements.infoPage.classList.remove('in');
      }
    });

    // Test Handler for new info page
  }

  updateLabel(label) {
    // Set dom elements to change
    let infoHeaderTitle = this.state.domElements.infoHeaderTitle;
    let infoHeaderDescr = this.state.domElements.infoHeaderDescr;
    let labelDescription = this.state.domElements.labelDescription;
    let layeredImgs = this.state.domElements.layeredImgs;
    // Set variables used in the updating function
    let formattedLabel = label.replaceAll('_', ' ');
    let labelObj = this.labels[label];

    // Update Information Page
    infoHeaderTitle.innerHTML = formattedLabel;
    infoHeaderDescr.innerText = labelObj.headerDescr;
    labelDescription.innerText = labelObj.labelDescr;

    // Remove any visible images
    for (let child of layeredImgs.childNodes) {
      if (child.classList) {
        child.classList.remove('in');
      }
    }

    // Add desired image
    document.getElementById(`${label}Img`).classList.add('in');

    // Check if label is natural and update class
    // if (labelObj.natural) {
    //   labelInfo.classList.add('natural');
    // } else {
    //   labelInfo.classList.remove('natural');
    // }
  }

  initializeImages() {
    for (const label of Object.keys(this.labels)) {
      var labelObj = this.labels[label];
      var img = document.createElement('img');
      img.id = `${label}Img`;
      img.src = labelObj.url;
      img.alt = `Image of ${label}`;
      img.classList.add('labelImage');
      this.state.domElements.layeredImgs.appendChild(img);
    }
  }
}
