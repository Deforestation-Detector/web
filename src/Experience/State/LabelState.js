import Experience from '..';
// Import image paths
import agricultureImg from '../../img/labelImages/agriculture.jpg';
import cultivationImg from '../../img/labelImages/cultivation.jpg';
import habitationImg from '../../img/labelImages/habitation.jpg';
import roadImg from '../../img/labelImages/road.jpg';
import waterImg from '../../img/labelImages/water.jpg';

export default class LabelState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.labels = {
      agriculture: {
        headerDescr:
          'Agriculture is the practice of cultivating plants and livestock.',
        labelDescr:
          'While certain levels of agriculture are necessary for survival, large-scale commodity agriculture has been shown to have severe negative effects on the environment. Two of these commodities, beef and soy, have been some of the leading drivers of rainforest conversion. Demand for these products has been soaring worldwide, and in order to create pastures and fields to grow them, acres upon acres of the Amazon Rainforest have been cleared for space.\n\nThis has drastic consequences for the health of the rainforest and its inhabitants. The clearing of trees directly destroys a lot of animal habitation. Common agricultural practices tend to cause soil erosion and river siltation. Pesticides commonly used to protect crops eventually leak into the soil and contaminate nearby sources of water. The negative effects of large-scale agriculture in the Amazon Rainforest are measurable and devastating.',
        ctaDescr:
          'You can help combat large-scale agriculture in the Amazon by reducing your beef and soy consumption and making more thoughtful decisions with your food. Also consider getting involved with the World Wildlife Fund whose mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.',
        ctaLink: 'https://wwf.panda.org/act/take_action/',
        ctaBtnTxt: 'World Wildlife Fund',
        natural: false,
        url: agricultureImg,
      },
      cultivation: {
        headerDescr:
          'Cultivation is the preparing of land to be used for agricultural purposes.',
        labelDescr: `Land cultivation is necessary for the growing of crops and livestock. However, there are sustainable cultivation practices and unsustainable cultivation practices, the latter of which cause damage to the surrounding environment. In order to keep up with beef and soy demand, large-scale agriculture resorts to unsustainable practices, the effects of which are more apparent every day.\n\nMany of these unsustainable cultivation practices have sustainable counterparts.\nInstead of using chemical fertilizers and growing homogeneous plots of crops, diverse crops can be planted in various plots while leaving other plots empty. While this isn’t as profitable in the short term, it allows the soil to recover and regain its nutrients and facilitates long-term, sustainable farming.\nInstead of slashing and burning sections of the rainforest to create farmland, 
          the trees can be cut down and the lumber could be used for sustainable housing and building construction. While this takes more effort, it cuts down on a lot of CO2 emissions.\n\nWhile these sustainable methods are more effort and less profitable, they are more viable for the long term and contribute to a healthier rainforest.`,
        ctaDescr:
          'You can help combat adverse cultivation practices by becoming informed of healthier practices and spreading the word. Also consider getting involved with the World Wildlife Fund, which has programs for promoting sustainable practices in the Amazon.',
        ctaLink:
          'https://www.wwf.org.uk/what-we-do/projects/tackling-unsustainable-practices-amazon',
        ctaBtnTxt: 'World Wildlife Fund',
        natural: false,
        url: cultivationImg,
      },
      habitation: {
        headerDescr:
          'Habitation is the construction of living spaces in the rainforest.',
        labelDescr:
          'Human settlements, especially in the Amazon, are disruptive to the native wildlife. To build these habitations, space in the rainforest must be cleared out to make room. In addition to eliminating wildlife habitations, housing construction can also create fragmentation in the rainforest which leads to rainforest die-off.\n\nIn 2014, the Climate Policy Initiative discovered that rural settlements are responsible for roughly 30% of deforestation in the Amazon. The demand for these rural settlements comes in part from Bolsonaro’s incentives to increase gold mining in the Amazon. In order to house the miners that work on extracting gold from the Amazon, small settlements must be created near the mines.\n\nHuman settlements don’t need to be destructive however. There are sustainable construction practices like mindful planning and lumber reuse that can be employed to lessen the impact on the rainforest.',
        ctaDescr:
          'The gold mined from the Amazon is consumed in a large part by the electronics industry, as it’s an important metal for creating conductive and rust-resistant electronic parts.\n\nYou can help combat habitation in the Amazon by using your electronics as long as you can. When it is absolutely necessary to replace them, check out the Environmental Protection Agency’s site on electronic donation and recycling to find out how you can recycle your old electronics.',
        ctaLink:
          'https://www.epa.gov/recycle/electronics-donation-and-recycling',
        ctaBtnTxt: 'EPA Electronic Recycling',
        natural: false,
        url: habitationImg,
      },
      road: {
        headerDescr:
          'Roads are paths built through the rainforest from one location to another.',
        labelDescr:
          'Roads are essential to allow people to transport food, supplies, and themselves around and through the rainforest. Unfortunately, building them has consequences for the health of the rainforest.\n\nBuilding roads typically involves clearing out large strips of the rainforest and can disrupt the wildlife. In addition, the existence of roads through the rainforest tends to facilitate further deforestation, since it’s even easier to drive in equipment and drive out lumber.\n\nRoads can also cause habitat fragmentation by breaking up sections of the rainforest into smaller subsections. This fragmentation can cause changes in humidity levels, wind, temperature, and exposure to invasive species and fire which in turn can lead to rainforest die-off.',
        ctaDescr:
          'You can help combat destructive road construction in the Amazon by becoming informed on sustainable road building practices and spreading the word. Conservation.org is a great place to start.',
        ctaLink:
          'https://www.conservation.org/blog/building-roads-protecting-forests-community-resilience-in-the-bolivian-amazon/',
        ctaBtnTxt: 'Conservation.org',
        natural: false,
        url: roadImg,
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
      // window.open(this.state.domElements.ctaBtn.href);
    };

    // Event Handler for handling state change
    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'investigate') {
        // Update the label
        let element = this.state.cursorState.getIntersection();
        this.updateLabel(element);
        this.state.domElements.content.scrollTop = 0;
        this.state.domElements.learnMore.scrollTop = 0;
        // Set the state
        this.state.domElements.backdrop.classList.add('in');
        this.state.domElements.infoPage.classList.add('in');
      } else {
        this.state.domElements.backdrop.classList.remove('in');
        this.state.domElements.infoPage.classList.remove('in');
      }
    });
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
