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
          'Agriculture is the practice of cultivating plants and livestock.',
        labelDescr:
          'While certain levels of agriculture are necessary for survival, large-scale commodity agriculture has been shown to have severe negative effects on the environment. Two of these commodities, beef and soy, have been some of the leading drivers of rainforest conversion. Demand for these products has been soaring worldwide, and in order to create pastures and fields to grow them, acres upon acres of the Amazon Rainforest have been cleared for space.\n\nThis has drastic consequences for the health of the rainforest and its inhabitants. The clearing of trees directly destroys a lot of animal habitation. Common agricultural practices tend to cause soil erosion and river siltation. Pesticides commonly used to protect crops eventually leak into the soil and contaminate nearby sources of water. The negative effects of large-scale agriculture in the Amazon Rainforest are measurable and devastating',
        ctaDescr:
          'You can help combat large-scale agriculture in the Amazon by reducing your beef and soy consumption and making more thoughtful decisions with your food. Also consider getting involved with the World Wildlife Fund whose mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.',
        ctaLink: 'https://wwf.panda.org/act/take_action/',
        ctaBtnTxt: 'World Wildlife Fund',
        natural: false,
        url: agricultureImg,
      },
      artisinal_mine: {
        headerDescr:
          'This is the header description for the artisinal mine label.',
        labelDescr:
          'This is the label description for the artisinal mine label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: artisinalMineImg,
      },
      bare_ground: {
        headerDescr:
          'This is the header description for the bare ground label.',
        labelDescr: 'This is the label description for the bare ground label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: bareGroundImg,
      },
      blooming: {
        headerDescr: 'This is the header description for the blooming label.',
        labelDescr: 'This is the label description for the blooming label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: bloomingImg,
      },
      blow_down: {
        headerDescr: 'This is the header description for the blow down label.',
        labelDescr: 'This is the label description for the blow down label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: blowDownImg,
      },
      clear: {
        headerDescr: 'This is the header description for the clear label.',
        labelDescr: 'This is the label description for the clear label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: clearImg,
      },
      cloudy: {
        headerDescr: 'This is the header description for the cloudy label.',
        labelDescr: 'This is the label description for the cloudy label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: cloudyImg,
      },
      conventional_mine: {
        headerDescr:
          'This is the header description for the conventional mine label.',
        labelDescr:
          'This is the label description for the conventional mine label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: conventionalMineImg,
      },
      cultivation: {
        headerDescr:
          'Cultivation is the preparing of land to be used for agricultural purposes.',
        labelDescr:
          'Land cultivation is often invasive and destructive. Commonly used fertilizers and pesticides contain chemicals which damage the land and eventually leech and flow into bodies of water, further affecting the wildlife.',
        ctaDescr:
          'This is a description of the call to action for cultivation.',
        ctaLink: 'This is the url to the call to action for cultivation.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: cultivationImg,
      },
      habitation: {
        headerDescr:
          'Habitation is the construction of living spaces and the dwelling of people in those spaces.',
        labelDescr:
          'Human settlements, especially in the Amazon, are disruptive to the native wildlife and usually space must be cleared for their construction.',
        ctaDescr: 'This is a description of the call to action for habitation.',
        ctaLink: 'This is the url to the call to action for habitation.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: habitationImg,
      },
      haze: {
        headerDescr: 'This is the header description for the haze label.',
        labelDescr: 'This is the label description for the haze label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: hazeImg,
      },
      partly_cloudy: {
        headerDescr:
          'This is the header description for the partly cloudy label.',
        labelDescr:
          'This is the label description for the partly cloudy label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: partlyCloudyImg,
      },
      primary: {
        headerDescr: 'This is the header description for the primary label.',
        labelDescr: 'This is the label description for the primary label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: true,
        url: primaryImg,
      },
      road: {
        headerDescr:
          'Roads are paths built through the rainforest from one location to another.',
        labelDescr:
          'Roads are essential to allow people to transport food, supplies, and themselves around the rainforest. Unfortunately, building them usually involves clearing out large strips of the rainforest and can disrupt the wildlife.',
        ctaDescr: 'This is a description of the call to action for road.',
        ctaLink: 'This is the url to the call to action for road.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: roadImg,
      },
      selective_logging: {
        headerDescr:
          'This is the header description for the selective logging label.',
        labelDescr:
          'This is the label description for the selective logging label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: selectiveLoggingImg,
      },
      slash_burn: {
        headerDescr: 'This is the header description for the slash burn label.',
        labelDescr: 'This is the label description for the slash burn label.',
        ctaDescr: 'This is a description of the call to action.',
        ctaLink: 'This is the url to the call to action.',
        ctaBtnTxt: 'This is the button text',
        natural: false,
        url: slashBurnImg,
      },
      water: {
        headerDescr: 'Water is the life force of the rainforest.',
        labelDescr:
          'The Amazon is home to the Amazon River, the largest river by discharge volume of water in the world. This water is an important component of the rainforest, sustaining nearly one-third of all known species of animals in the world as well as the diverse plant life.\n\nHowever, deforestation threatens to disrupt the balance of the water cycle. Trees help increase the water vapor content in the air and lead to precipitation. Without them, there is less rain, and less water replenishing the river. What’s more, roots of trees help maintain water in the soil, and without them there’s increased sediment runoff into the river, clogging it up and affecting the structure of the river.\n\nAgriculture also threatens the health of the river. The use of pesticides and other agricultural chemicals often leaks into the soil and eventually the surrounding bodies of water. This can pose a threat to the wildlife that depend on clean water.\n\nThe water of the Amazon Rainforest is under attack and is crucial to the survival of many species.',
        ctaDescr:
          "You can help combat drought and water pollution in the Amazon by becoming informed of the human impact on the Amazon's water. Also consider getting involved with Amazon Aid Foundation which aims to preserve the Amazon Rainforest including its river.",
        ctaLink: 'https://amazonaid.org/activate/',
        ctaBtnTxt: 'Amazon Aid Foundation',
        natural: true,
        url: waterImg,
      },
    };

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
      ctaDescr: document.querySelector('.ctaDescr'),
      ctaBtn: document.querySelector('.ctaBtn'),
    };
  }

  setEventHandlers() {
    // Event Handler for clicking on close button
    this.state.domElements.closeBtn.onclick = () => {
      this.state.viewState.back();
    };

    // Event Handler for clicking CTA button
    this.state.domElements.ctaBtn.onclick = () => {
      window.open(this.state.domElements.ctaBtn.href);
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
    let layeredImgs = this.state.domElements.layeredImgs;
    let labelDescription = this.state.domElements.labelDescription;
    let ctaDescr = this.state.domElements.ctaDescr;
    let ctaBtn = this.state.domElements.ctaBtn;

    // Set variables used in the updating function
    let formattedLabel = label.replaceAll('_', ' ');
    let labelObj = this.labels[label];

    // Update Information Page
    infoHeaderTitle.innerHTML = formattedLabel;
    infoHeaderDescr.innerText = labelObj.headerDescr;
    labelDescription.innerText = labelObj.labelDescr;
    ctaDescr.innerText = labelObj.ctaDescr;
    ctaBtn.innerHTML = labelObj.ctaBtnTxt;
    ctaBtn.href = labelObj.ctaLink;

    // Remove any visible images
    for (let child of layeredImgs.childNodes) {
      if (child.classList) {
        child.classList.remove('in');
      }
    }

    // Add desired image
    document.getElementById(`${label}Img`).classList.add('in');
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
