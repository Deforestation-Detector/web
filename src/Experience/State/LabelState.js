import Experience from "..";

export default class LabelState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.labels = {
      haze: "This is the description for the haze label.",
      primary: "This is the description for the primary label.",
      agriculture: "This is the description for the agriculture label.",
      clear: "This is the description for the clear label.",
      water: "This is the description for the water label.",
      habitation: "This is the description for the habitation label.",
      road: "This is the description for the road label.",
      cultivation: "This is the description for the cultivation label.",
      slash_burn: "This is the description for the slash burn label.",
      cloudy: "This is the description for the cloudy label.",
      partly_cloudy: "This is the description for the partly cloudy label.",
      conventional_mine:
        "This is the description for the conventional mine label.",
      bare_ground: "This is the description for the bare ground label.",
      artisinal_mine: "This is the description for the artisinal mine label.",
      blooming: "This is the description for the blooming label.",
      selective_logging:
        "This is the description for the selective logging label.",
      blow_down: "This is the description for the blow down label.",
    };

    this.labelList = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];

    this.setDomElements();
    this.setEventHandlers();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      labelListNode: document.getElementById("labelList"),
      infoPageNode: document.getElementById("infoPage"),
      updateButton: document.getElementById('updateLabelsBtn'),
    };

  }
  
  setEventHandlers() {
    // Event Handler for update button
    this.state.domElements.updateButton.onclick = () => {
      this.state.trigger('labelsUpdated');
    }
    this.state.on('labelsUpdated', () => {this.updateTest()});
  }

  updateLabels(labelArray) {
    let labelListNode = this.state.domElements.labelListNode;
    let infoPageNode = this.state.domElements.infoPageNode;
    // Clear label list and info page
    labelListNode.innerHTML = "";
    infoPageNode.innerHTML = "";
    // Iterate through passed labels
    labelArray.forEach((label) => {
      if (Object.keys(this.labels).includes(label)) {
        // Replace any underscores with spaces
        let formattedLabel = label.replaceAll("_", " ");
        // Add label to list
        let labelToInsert = document.createElement("p");
        labelToInsert.innerHTML = formattedLabel;
        labelListNode.appendChild(labelToInsert);

        // Add label description to info page
        // Create nodes
        let labelWrapper = document.createElement("div");
        let labelTitle = document.createElement("h1");
        let labelDescription = document.createElement("p");
        // Fill nodes
        labelWrapper.classList.add("tileLabel");
        labelTitle.innerHTML = formattedLabel;
        labelDescription.innerHTML = this.labels[label];
        labelWrapper.appendChild(labelTitle);
        labelWrapper.appendChild(labelDescription);

        // Add label wrapper to info page
        infoPageNode.appendChild(labelWrapper);
      }
    });
  }

  updateTest() {
    let newLabels = [];
    let remainingLabels = Object.keys(this.labels);
    while (newLabels.length < 5) {
      var temp = remainingLabels[(remainingLabels.length * Math.random()) << 0];
      remainingLabels = remainingLabels.filter((el) => el !== temp);
      newLabels.push(temp);
    }
    this.updateLabels(newLabels);
  }
}
