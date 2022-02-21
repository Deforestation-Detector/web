import Experience from "..";

export default class LabelState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.labels = {
      haze: {
        description: "This is the description for the haze label.",
        natural: true,
      },
      primary: {
        description: "This is the description for the primary label.",
        natural: true,
      },
      agriculture: {
        description: "This is the description for the agriculture label.",
        natural: false,
      },
      clear: {
        description: "This is the description for the clear label.",
        natural: true,
      },
      water: {
        description: "This is the description for the water label.",
        natural: true,
      },
      habitation: {
        description: "This is the description for the habitation label.",
        natural: false,
      },
      road: {
        description: "This is the description for the road label.",
        natural: false,
      },
      cultivation: {
        description: "This is the description for the cultivation label.",
        natural: false,
      },
      slash_burn: {
        description: "This is the description for the slash burn label.",
        natural: false,
      },
      cloudy: {
        description: "This is the description for the cloudy label.",
        natural: true,
      },
      partly_cloudy: {
        description: "This is the description for the partly cloudy label.",
        natural: true,
      },
      conventional_mine: {
        description: "This is the description for the conventional mine label.",
        natural: false,
      },
      bare_ground: {
        description: "This is the description for the bare ground label.",
        natural: true,
      },
      artisinal_mine: {
        description: "This is the description for the artisinal mine label.",
        natural: false,
      },
      blooming: {
        description: "This is the description for the blooming label.",
        natural: false,
      },
      selective_logging: {
        description: "This is the description for the selective logging label.",
        natural: false,
      },
      blow_down: {
        description: "This is the description for the blow down label.",
        natural: true,
      },
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
      investigateButton: document.getElementById("investigateBtn"),
      updateButton: document.getElementById("updateLabelsBtn"),
    };
  }

  setEventHandlers() {
    // Event Handler for update button
    this.state.domElements.updateButton.onclick = () => {
      this.state.trigger("labelsUpdated");
    };
    this.state.on("labelsUpdated", () => {
      this.updateTest();
    });

    // Event Handler for investigate button
    this.state.domElements.investigateButton.onclick = () => {
      this.state.trigger("investigating");
    };
    this.state.on("investigating", () => {
      this.state.viewState.setView("investigate");
    });

    // Event Handler for clicking on info page (to leave it)
    this.state.domElements.infoPageNode.onclick = () => {
      console.log("clicked");
      this.state.trigger("doneInvestigating");
    };
    this.state.on("doneInvestigating", () => {
      this.state.viewState.setView("exploring");
    });
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
        if (this.labels[label].natural) {
          labelWrapper.classList.add("natural");
        }
        labelTitle.innerHTML = formattedLabel;
        labelDescription.innerHTML = this.labels[label].description;
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
