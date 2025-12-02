import { DeckOfCards, StandardCards } from "@andrewscripts/deck-of-cards.js";

// # TYPE DEFINITIONS

/**
 * @typedef {Object} GKCard
 * @prop {number} numberRank
 * @prop {string} nameRank
 * @prop {string} initial // The card's "symbol"
 * @prop {string} suit
 * @prop {string} name
 * @prop {number} value
 * @prop {boolean} facingDown
 */

/**
 * @typedef {Object} InventoryCard
 * @prop {GKCard | null} card - The card
 * @prop {boolean} selected - Whether the card is selected
 * @prop {boolean} locked - Whether the slot is locked
 */

/**
 * @typedef {Object} Piles
 * @property {DeckOfCards<GKCard>} source - The main deck of cards
 * @property {{[x: string]: InventoryCard}} inventory - The inventory of cards, each with a slot (a1 to a7)
 * @property {GKCard[]} inventoryDiscard - The discard pile for the Inventory
 * @property {GKCard[]} hold - The Knowstones pile
 * @property {DeckOfCards<GKCard>} threshold - The Threshold deck of cards
 * @property {GKCard|null} thresholdActive - The active Knowble
 * @property {GKCard[]} thresholdDiscard - The discard pile for the Threshold
 * @property {DeckOfCards<GKCard>} veil - The Obstacles deck of cards
 * @property {GKCard|null} obstaclesActive - The active Obstacle from the Veil
 */

/** @typedef {{[x: string]: string}} ObjectMap */

// CONSTANTS

/** The suit icons used in the game */
/** @type {ObjectMap} */
const suitIcons = {
  Clubs: "♣",
  Hearts: "♥",
  Spades: "♠",
  Diamonds: "♦",
  Joker: "☹︎", // Joker
};

/** Unlocked State Tracker */
/** @type {{[x: string]: boolean}} */
const unlocked = {
  i7: false, // Inventory slot i7
  threshold: false,
  thresholdActive: true, // Active Knowble is always visible
  obstaclesActive: true, // Active Obstacle is always visible
  veil: false,
  source: false,
  knowbleDiscard: true, // Knowble discard is always visible
  hold: true, // Knowstones are always visible
  sourceDiscard: true, // Source discard is always visible
  aceChoice: false, // Ace choice is not unlocked by default
};

// Get card templates for making cards
/** The Face Up Template */
const faceUpTemplate = /** @type {HTMLTemplateElement} */ (
  document.getElementById("faceUpCardTemplate")
);
/** The Face Down Template */
const faceDownTemplate = /** @type {HTMLTemplateElement} */ (
  document.getElementById("faceDownCardTemplate")
);

// Get pile elements for rendering cards
/** The Knowble Discard Element */
const knowbleDiscardElement = document.getElementById("knowbleDiscard");
/** The Threshold Element */
const thresholdElement = document.getElementById("threshold");
/** The Active Knowble Element */
const activeKnowbleElement = document.getElementById("activeKnowble");
/** The Active Weapon Element */
const activeObstacleElement = document.getElementById("activeObstacle");
/** The Weapons Rack Element */
const veilElement = document.getElementById("veil");
/** The Source Element */
const sourceElement = document.getElementById("source");
/** The Inventory Discard Element */
const inventoryDiscardElement = document.getElementById("discard");
/** The Hold Element */
const holdElement = document.getElementById("hold");
/** The Target Score Element */
const trialScoreElement = /** @type {HTMLElement} */ (
  document.getElementById("trialScore")
);
/** The Target Resistance Element */
const trialDifficultyElement = /** @type {HTMLElement} */ (
  document.getElementById("trialDifficulty")
);
/** The Current Score Element */
const currentScoreElement = /** @type {HTMLElement} */ (
  document.getElementById("currentScore")
);
/** The Current Resistance Element */
const currentEffortElement = /** @type {HTMLElement} */ (
  document.getElementById("currentEffort")
);

// SETUP BASE CARDS AND DECKS

// The initial base cards that will be split up into decks
const BaseCards = StandardCards.standard52DeckOfCardsWithJokers.map((card) => {
  // Rename Royals to their number rank and provide target hints
  /** @type {ObjectMap} */
  const initialMap = {
    Jack: "11",
    Queen: "12",
    King: "13",
    Joker: "Hazard",
    Ace: "1/11",
  };
  const initial = initialMap[card.nameRank] || (card.numberRank + 2).toString();

  return {
    ...card,
    initial: initial,
    value: card.numberRank + 2,
    facingDown: true,
  };
});

// Separate the Knowbles from the Source
const { KnowbleCards, SourceCards } = BaseCards.reduce(
  (acc, card) => {
    const KnowbleNumbers = [9, 10, 11, 99];

    if (KnowbleNumbers.includes(card.numberRank)) {
      acc.KnowbleCards.push(card);
    } else {
      acc.SourceCards.push(card);
    }

    return acc;
  },
  {
    KnowbleCards: /** @type {GKCard[]} */ ([]),
    SourceCards: /** @type {GKCard[]} */ ([]),
  }
);

// Create the decks of cards
const Threshold = new DeckOfCards(KnowbleCards);
const Source = new DeckOfCards(SourceCards);

// Draw out a veil (obstacles)
const Obstacles = Source.drawFromDrawPile(13);
const Veil = new DeckOfCards(Obstacles);

/**
 * Initialize the piles
 * @type {Piles}
 */
const Piles = {
  source: Source,
  inventory: {
    i1: {
      card: null,
      selected: false,
      locked: false,
    },
    i2: {
      card: null,
      selected: false,
      locked: false,
    },
    i3: {
      card: null,
      selected: false,
      locked: false,
    },
    i4: {
      card: null,
      selected: false,
      locked: false,
    },
    i5: {
      card: null,
      selected: false,
      locked: false,
    },
    i6: {
      card: null,
      selected: false,
      locked: false,
    },
    i7: {
      card: null,
      selected: false,
      locked: true,
    },
  },
  inventoryDiscard: [],
  hold: [],
  threshold: Threshold,
  thresholdActive: null, // The active Knowble
  thresholdDiscard: [],
  veil: Veil,
  obstaclesActive: null, // The active obstacle
};

const Counters = {
  trialScore: 0,
  trialDifficulty: 0,
  currentScore: 0,
  currentEffort: 0,
};

// HELPER FUNCTIONS

/**
 * Get the top card from a deck's draw pile
 * @param {DeckOfCards<GKCard>} deck
 */
const getTopCard = (deck) => {
  if (deck && deck.drawPile.length > 0) {
    return deck.drawFromDrawPile(1)[0];
  }
  return null;
};

/**
 * Get all of the cards from a pile
 * @param {GKCard[]} pile
 */
const getAllFromPile = (pile) => {
  const cardsToReturn = pile.splice(0);
  return cardsToReturn;
};

/**
 * Move a card from one pile to the discard pile
 * @param {InventoryCard} fromPile - The pile to discard from
 * @param {DeckOfCards<GKCard>} toDeck - The deck to discard to
 */
const discardCard = (fromPile, toDeck) => {
  if (fromPile.card && toDeck) {
    toDeck.addToDiscardPile([fromPile.card]);
    fromPile.card = null;
  }
};

/** Move all cards from the inventory to the discard pile */
const moveAllInventoryToDiscard = () => {
  Object.keys(Piles.inventory).forEach((key) => {
    discardCard(Piles.inventory[key], Piles.source);
  });
};

/**
 * Make a face up card
 * @param {GKCard} card - The card to make
 * @param {number} index - The index of the card in the pile
 * @returns {HTMLElement} - The card element
 */
const makeFaceUpCard = (card, index) => {
  // Clone the face up card template
  const faceUpCard = /** @type {HTMLElement} */ (
    faceUpTemplate.content.cloneNode(true)
  );

  // Get main element and add index to it
  const cardElement = faceUpCard.querySelector(".gk-card");
  if (cardElement) {
    cardElement.setAttribute("style", `--index: ${index}`);

    if (card.suit === "Hearts" || card.suit === "Diamonds") {
      // If the suit is Hearts or Diamonds, add a class for red color
      cardElement.classList.add("red");
    }
  }

  // Helper function to set the innerHTML of an element
  const setInnerHTML = (/** @type {string} */ selector, /** @type {string} */ content) => {
    const element = faceUpCard.querySelector(selector);
    if (element) {
      element.innerHTML = content;
    }
  };

  // Set the card's suit and rank
  setInnerHTML(".gk-card__rank", card.initial);
  setInnerHTML(".gk-card__suit", suitIcons[card.suit]);

  return faceUpCard;
};

/**
 * Make a face down card
 * @param {number} index - The index of the card in the pile
 * @returns {HTMLElement} - The face down card element
 */
const makeFaceDownCard = (index) => {
  // Clone the face down card template
  const faceDownCard = /** @type {HTMLElement} */ (
    faceDownTemplate.content.cloneNode(true)
  );
  // Get main element and add index to it
  const cardElement = faceDownCard.querySelector(".gk-card");
  if (cardElement) {
    cardElement.setAttribute("style", `--index: ${index}`);
  }

  return faceDownCard;
};

/**
 * Toggle the selected state of an inventory slot
 * @param {string} key - The key of the inventory slot (e.g., 'i1')
 */
const toggleSelection = (key) => {
  const slot = Piles.inventory[key];
  if (slot && slot.card && !slot.locked) {
    slot.selected = !slot.selected;
    renderInventorySlots();
  }
};

// NEW GAME LOGIC
const NewGame = () => {
  // Draw up all of the cards from the draw piles
  resetPiles();

  // Place cards into their places
  initPiles();

  // Update the UI to reflect the new game state
  renderPiles();

  // Setup event listeners
  setupEventListeners();
};

document.addEventListener("DOMContentLoaded", () => {
  // Start a new game when the page is ready
  NewGame();
});

/** Updates the score and resistance counters */
function updateCounters() {
  // Get the active Knowble and Weapon
  const activeKnowble = Piles.thresholdActive;
  const activeObstacle = Piles.obstaclesActive;

  // Calculate the target resistance
  /** @type {{[key: number]: number}} */
  const difficulties = {
    11: 2,
    12: 3,
    13: 4,
  };

  // Update the target score and resistance
  Counters.trialScore =
    (activeKnowble?.value || 0) + (activeObstacle?.value || 0);
  const difficulty = activeKnowble?.value || 11;
  Counters.trialDifficulty = difficulties[difficulty] || 0;

  // Calculate the current score and resistance
  const inventoryCards = Object.values(Piles.inventory)
    .filter((pile) => pile.selected)
    .map((pile) => pile.card);
  const { currentScore, currentEffort } = inventoryCards.reduce(
    (acc, card) => {
      if (card) {
        acc.currentScore += card.value;
        acc.currentEffort += 1;
      }
      return acc;
    },
    { currentScore: 0, currentEffort: 0 }
  );
  Counters.currentScore = currentScore;
  Counters.currentEffort = currentEffort;

  // Render the counters in the UI
  trialScoreElement.textContent = `${Counters.trialScore}`;
  trialDifficultyElement.textContent = `${Counters.trialDifficulty}`;
  currentScoreElement.textContent = `${Counters.currentScore}`;
  currentEffortElement.textContent = `${Counters.currentEffort}`;

  // Enable/Disable the Play These Cards button
  const playButton = document.getElementById("playTheseCardsButton");
  if (playButton) {
    if (
      Counters.currentScore >= Counters.trialScore &&
      Counters.currentEffort >= Counters.trialDifficulty
    ) {
      playButton.removeAttribute("disabled");
    } else {
      playButton.setAttribute("disabled", "true");
    }
  }
}

/** Updates the UI to reflect the current state of the piles */
function renderPiles() {
 /** @type {{[x:string]: {pile: Array<GKCard | null>, targetElement: HTMLElement | null}}} */
  const PilesToRender = {
    hold: {
      pile: Piles.hold,
      targetElement: holdElement,
    },
    knowbleDiscard: {
      pile: Piles.threshold.discardPile,
      targetElement: knowbleDiscardElement,
    },
    threshold: {
      pile: Piles.threshold.drawPile,
      targetElement: thresholdElement,
    },
    thresholdActive: {
      pile: [Piles.thresholdActive],
      targetElement: activeKnowbleElement,
    },
    veil: {
      pile: Piles.veil.drawPile,
      targetElement: veilElement,
    },
    obstaclesActive: {
      pile: [Piles.obstaclesActive],
      targetElement: activeObstacleElement,
    },
    source: {
      pile: Piles.source.drawPile,
      targetElement: sourceElement,
    },
    inventoryDiscard: {
      pile: Piles.source.discardPile,
      targetElement: inventoryDiscardElement,
    },
  };

  // Render each pile to its target element
  Object.keys(PilesToRender).forEach((key) => {
    const { pile, targetElement } = PilesToRender[key];
    if (pile instanceof DeckOfCards) {
      renderPile(key, pile.drawPile, targetElement);
    } else {
      renderPile(key, pile, targetElement);
    }
  });

  // Render Inventory slots
  renderInventorySlots();
}

/** Updates the UI to reflect the current state of the inventory slots */
function renderInventorySlots() {
  for (let i = 1; i <= 7; i++) {
    const inventoryKey = `i${i}`;
    const inventorySlot = Piles.inventory[inventoryKey];
    const inventoryElement = document.getElementById(inventoryKey);

    if (inventoryElement) {
      // If not blocked by a hazard and the slot has a card, render it face up
      if (
        !inventoryElement.classList.contains("pile--locked") &&
        inventorySlot.card
      ) {
        // If the card is an Ace and acesChoice is locked, set its value to 1
        if (inventorySlot.card.nameRank === "Ace" && !unlocked.aceChoice) {
          inventorySlot.card.initial = "1";
          inventorySlot.card.value = 1;
        }
        const cardEl = makeFaceUpCard(inventorySlot.card, i - 1);

        inventoryElement.replaceChildren(cardEl);
      } else if (!inventoryElement.classList.contains("pile--locked")) {
        // If the slot is locked, render a face down card
        const cardEl = makeFaceDownCard(i - 1);
        inventoryElement.replaceChildren(cardEl);
      }

      // Add selected class to the pile if selected
      if (inventorySlot.selected) {
        inventoryElement.classList.add("selected");
      } else {
        inventoryElement.classList.remove("selected");
      }
    }
  }

  updateCounters();
}

/**
 * Setup event listeners for the game
 */
function setupEventListeners() {
  // Add click listeners to inventory piles
  for (let i = 1; i <= 7; i++) {
    const inventoryKey = `i${i}`;
    const inventoryElement = document.getElementById(inventoryKey);
    if (inventoryElement) {
      inventoryElement.onclick = () => {
        toggleSelection(inventoryKey);
      };
    }
  }

  // Add click listener to play button
  const playButton = document.getElementById("playTheseCardsButton");
  if (playButton) {
    playButton.onclick = () => {
      playCards();
    };
  }
}

/**
 * Render a pile of cards to a target element.
 * Shows all but the top card face down, top card face up.
 * @param {string} pileName - The name of the pile to render
 * @param {(GKCard | null)[]} pile - The pile of cards to render
 * @param {HTMLElement | null} targetElement - The container to render into
 */
function renderPile(pileName, pile, targetElement) {
  // Clone the pile so we don't mutate the original
  const pileClone = Array.from(pile || []);

  // Reverse the pile order so that [0] ends up on top
  pileClone.reverse();

  // Make card elements
  const pileLength = pileClone.length;
  const cardEls = pileClone.map((card, index) => {
    if (index < pileLength - 1 || !unlocked[pileName]) {
      return makeFaceDownCard(index);
    } else if (card) {
      // If pileName is obstaclesActive and the card is an ace, set it's initial and value to 11
      if (pileName === "obstaclesActive" && card.nameRank === "Ace") {
        card.initial = "11";
        card.value = 11;
      }
      return makeFaceUpCard(card, index);
    }
    return null;
  }).filter((cardEl) => cardEl !== null);

  // Append the cards to the target container
  targetElement?.replaceChildren(...cardEls);
}

/**
 * Initialize the piles with the starting cards
 * This function should be called when starting a new game
 */
function initPiles() {
  // Init Threshold active card
  Piles.thresholdActive = getTopCard(Piles.threshold);

  // Init Veil with Obstacles
  const obstaclesCards = Piles.source.drawFromDrawPile(13);
  Piles.veil.addToDrawPile(obstaclesCards);
  Piles.obstaclesActive = getTopCard(Piles.veil);

  // Initialize Inventory slots with cards from the Source
  Object.keys(Piles.inventory).forEach((key) => {
    if (!Piles.inventory[key].locked) {
      const card = getTopCard(Piles.source);
      if (card) {
        Piles.inventory[key].card = card;
        Piles.inventory[key].selected = false;
      }
    }
  });
}

/**
 * Reset the piles to their initial state
 * This function should be called when starting a new game
 */
function resetPiles() {
  // Reset Inventory cards
  moveAllInventoryToDiscard();
  let inventoryCards = getAllFromPile(Piles.source.discardPile);
  inventoryCards.push(...getAllFromPile(Piles.source.drawPile));
  inventoryCards.push(...getAllFromPile(Piles.veil.discardPile));
  inventoryCards.push(...getAllFromPile(Piles.veil.drawPile));
  Piles.source.addToDrawPile(inventoryCards);
  Piles.source.shuffle(7);

  // Reset Threshold deck
  let thresholdCards = getAllFromPile(Piles.threshold.discardPile);
  thresholdCards.push(...getAllFromPile(Piles.threshold.drawPile));
  Piles.threshold.addToDrawPile(thresholdCards);
  Piles.threshold.shuffle(7);

  // Reset Knowstones pile
  Piles.hold = [];
}

/**
 * Play the selected cards
 */
function playCards() {
  // Get the current knowble and obstacle
  const activeKnowble = Piles.thresholdActive;
  const activeObstacle = Piles.obstaclesActive;

  // If there is no active knowble or obstacle, return
  if (!activeKnowble || !activeObstacle) {
    return;
  }

  // Remove the active knowble from the thresholdActive slot
  Piles.thresholdActive = null;

  // Remove the active obstacle from the obstaclesActive slot
  Piles.obstaclesActive = null;

  const knowbleValue = activeKnowble.value;
  const knowbleSuit = activeKnowble.suit;

  // Get the obstacle value
  const obstacleValue = activeObstacle.value;

  // Get the selected cards
  const selectedCards = Object.values(Piles.inventory).filter(
    (slot) => slot.selected
  ).map((slot) => slot.card);

  // Tally up the values of the selected cards whose suits match the knowble
  const totalValue = selectedCards.reduce((total, card) => {
    if (card && card.suit === knowbleSuit) {
      return total + card.value;
    }
    return total;
  }, 0);

  // If the total value is greater than or equal to the knowble value, 'score' the cards by moving the knowble to the hold pile, otherwise move it to the threshold discard pile
  if (totalValue >= knowbleValue + obstacleValue) {
    Piles.hold.push(activeKnowble);
  } else {
    Piles.thresholdDiscard.push(activeKnowble);
  }

  // Move the selected cards to the discard pile and reset the slots
  Object.values(Piles.inventory).forEach((slot) => {
    if (slot.selected && slot.card) {
      // Move the selected cards to the discard pile
      Piles.inventoryDiscard.push(slot.card);

      // Draw new cards to replace the selected cards
      const card = getTopCard(Piles.source);
      slot.card = card;

      // Reset the selection
      slot.selected = false;
    }
  });

  // Draw a new obstacle
  Piles.obstaclesActive = getTopCard(Piles.veil);

  // Draw a new knowble
  Piles.thresholdActive = getTopCard(Piles.threshold);

  // If there is no active knowble or obstacle, the game is over
  if (!Piles.obstaclesActive || !Piles.thresholdActive) {
    // endGame(); TODO: Implement end game logic
    return;
  }

  // Update the UI
  renderPiles();
}
