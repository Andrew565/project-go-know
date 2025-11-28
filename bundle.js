(function () {
  'use strict';

  var n=[{numberRank:0,nameRank:"Two",initial:"2",suit:"Clubs",name:"Two of Clubs"},{numberRank:1,nameRank:"Three",initial:"3",suit:"Clubs",name:"Three of Clubs"},{numberRank:2,nameRank:"Four",initial:"4",suit:"Clubs",name:"Four of Clubs"},{numberRank:3,nameRank:"Five",initial:"5",suit:"Clubs",name:"Five of Clubs"},{numberRank:4,nameRank:"Six",initial:"6",suit:"Clubs",name:"Six of Clubs"},{numberRank:5,nameRank:"Seven",initial:"7",suit:"Clubs",name:"Seven of Clubs"},{numberRank:6,nameRank:"Eight",initial:"8",suit:"Clubs",name:"Eight of Clubs"},{numberRank:7,nameRank:"Nine",initial:"9",suit:"Clubs",name:"Nine of Clubs"},{numberRank:8,nameRank:"Ten",initial:"10",suit:"Clubs",name:"Ten of Clubs"},{numberRank:9,nameRank:"Jack",initial:"J",suit:"Clubs",name:"Jack of Clubs"},{numberRank:10,nameRank:"Queen",initial:"Q",suit:"Clubs",name:"Queen of Clubs"},{numberRank:11,nameRank:"King",initial:"K",suit:"Clubs",name:"King of Clubs"},{numberRank:12,nameRank:"Ace",initial:"A",suit:"Clubs",name:"Ace of Clubs"},{numberRank:0,nameRank:"Two",initial:"2",suit:"Hearts",name:"Two of Hearts"},{numberRank:1,nameRank:"Three",initial:"3",suit:"Hearts",name:"Three of Hearts"},{numberRank:2,nameRank:"Four",initial:"4",suit:"Hearts",name:"Four of Hearts"},{numberRank:3,nameRank:"Five",initial:"5",suit:"Hearts",name:"Five of Hearts"},{numberRank:4,nameRank:"Six",initial:"6",suit:"Hearts",name:"Six of Hearts"},{numberRank:5,nameRank:"Seven",initial:"7",suit:"Hearts",name:"Seven of Hearts"},{numberRank:6,nameRank:"Eight",initial:"8",suit:"Hearts",name:"Eight of Hearts"},{numberRank:7,nameRank:"Nine",initial:"9",suit:"Hearts",name:"Nine of Hearts"},{numberRank:8,nameRank:"Ten",initial:"10",suit:"Hearts",name:"Ten of Hearts"},{numberRank:9,nameRank:"Jack",initial:"J",suit:"Hearts",name:"Jack of Hearts"},{numberRank:10,nameRank:"Queen",initial:"Q",suit:"Hearts",name:"Queen of Hearts"},{numberRank:11,nameRank:"King",initial:"K",suit:"Hearts",name:"King of Hearts"},{numberRank:12,nameRank:"Ace",initial:"A",suit:"Hearts",name:"Ace of Hearts"},{numberRank:0,nameRank:"Two",initial:"2",suit:"Spades",name:"Two of Spades"},{numberRank:1,nameRank:"Three",initial:"3",suit:"Spades",name:"Three of Spades"},{numberRank:2,nameRank:"Four",initial:"4",suit:"Spades",name:"Four of Spades"},{numberRank:3,nameRank:"Five",initial:"5",suit:"Spades",name:"Five of Spades"},{numberRank:4,nameRank:"Six",initial:"6",suit:"Spades",name:"Six of Spades"},{numberRank:5,nameRank:"Seven",initial:"7",suit:"Spades",name:"Seven of Spades"},{numberRank:6,nameRank:"Eight",initial:"8",suit:"Spades",name:"Eight of Spades"},{numberRank:7,nameRank:"Nine",initial:"9",suit:"Spades",name:"Nine of Spades"},{numberRank:8,nameRank:"Ten",initial:"10",suit:"Spades",name:"Ten of Spades"},{numberRank:9,nameRank:"Jack",initial:"J",suit:"Spades",name:"Jack of Spades"},{numberRank:10,nameRank:"Queen",initial:"Q",suit:"Spades",name:"Queen of Spades"},{numberRank:11,nameRank:"King",initial:"K",suit:"Spades",name:"King of Spades"},{numberRank:12,nameRank:"Ace",initial:"A",suit:"Spades",name:"Ace of Spades"},{numberRank:0,nameRank:"Two",initial:"2",suit:"Diamonds",name:"Two of Diamonds"},{numberRank:1,nameRank:"Three",initial:"3",suit:"Diamonds",name:"Three of Diamonds"},{numberRank:2,nameRank:"Four",initial:"4",suit:"Diamonds",name:"Four of Diamonds"},{numberRank:3,nameRank:"Five",initial:"5",suit:"Diamonds",name:"Five of Diamonds"},{numberRank:4,nameRank:"Six",initial:"6",suit:"Diamonds",name:"Six of Diamonds"},{numberRank:5,nameRank:"Seven",initial:"7",suit:"Diamonds",name:"Seven of Diamonds"},{numberRank:6,nameRank:"Eight",initial:"8",suit:"Diamonds",name:"Eight of Diamonds"},{numberRank:7,nameRank:"Nine",initial:"9",suit:"Diamonds",name:"Nine of Diamonds"},{numberRank:8,nameRank:"Ten",initial:"10",suit:"Diamonds",name:"Ten of Diamonds"},{numberRank:9,nameRank:"Jack",initial:"J",suit:"Diamonds",name:"Jack of Diamonds"},{numberRank:10,nameRank:"Queen",initial:"Q",suit:"Diamonds",name:"Queen of Diamonds"},{numberRank:11,nameRank:"King",initial:"K",suit:"Diamonds",name:"King of Diamonds"},{numberRank:12,nameRank:"Ace",initial:"A",suit:"Diamonds",name:"Ace of Diamonds"}],m={numberRank:99,nameRank:"Joker",initial:"JO",suit:"Joker",name:"Joker (Plain)"},r={numberRank:99,nameRank:"Joker",initial:"JO",suit:"Joker",name:"Joker (Fancy)"},d=[...n,m,r],R={standard52DeckOfCardsWithJokers:d};var e=class{drawPile;discardPile;constructor(a){this.drawPile=a,this.discardPile=[],this.shuffle(7);}shuffle(a){for(var u=this.drawPile.length,i=0;i<a;i++)for(let s of this.drawPile){let o=this.drawPile.indexOf(s),t=Math.floor(Math.random()*u);this.drawPile[o]=this.drawPile[t],this.drawPile[t]=s;}}addToBottomOfDiscardPile(a){this.discardPile.push(...a);}addToDiscardPile(a){this.addToTopOfDiscardPile(a);}addToTopOfDiscardPile(a){this.discardPile.unshift(...a);}drawFromDiscardPile(a){return this.discardPile.splice(0,a)}addToBottomOfDrawPile(a){this.drawPile.push(...a);}addToDrawPile(a){this.addToBottomOfDrawPile(a);}addToTopOfDrawPile(a){this.drawPile.unshift(...a);}drawFromDrawPile(a){return this.drawPile.splice(0,a)}};new e(n);

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
   * @property {GKCard[]} hold - The Knowstones pile
   * @property {DeckOfCards<GKCard>} threshold - The Threshold deck of cards
   * @property {GKCard|null} thresholdActive - The active Knowble
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
  const BaseCards = R.standard52DeckOfCardsWithJokers.map((card) => {
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
  const Threshold = new e(KnowbleCards);
  const Source = new e(SourceCards);

  // Draw out a veil (obstacles)
  const Obstacles = Source.drawFromDrawPile(13);
  const Veil = new e(Obstacles);

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
    hold: [],
    threshold: Threshold,
    thresholdActive: null, // The active Knowble
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

  /** Move all cards from the arsenal to the discard pile */
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
    console.log("Toggling selection for", key);
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
    console.log("playButton", playButton);
    console.log("Counters", Counters);
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
      if (pile instanceof e) {
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
          if (inventorySlot.card.nameRank === "Ace" && true) {
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

    // Init Weapons Rack
    const weaponsCards = Piles.source.drawFromDrawPile(13);
    Piles.veil.addToDrawPile(weaponsCards);
    Piles.obstaclesActive = getTopCard(Piles.veil);

    // Initialize Arsenal slots with cards from the Armory
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
    // Reset Arsenal cards
    moveAllInventoryToDiscard();
    let armoryCards = getAllFromPile(Piles.source.discardPile);
    armoryCards.push(...getAllFromPile(Piles.source.drawPile));
    armoryCards.push(...getAllFromPile(Piles.veil.discardPile));
    armoryCards.push(...getAllFromPile(Piles.veil.drawPile));
    Piles.source.addToDrawPile(armoryCards);
    Piles.source.shuffle(7);

    // Reset Threshold deck
    let thresholdCards = getAllFromPile(Piles.threshold.discardPile);
    thresholdCards.push(...getAllFromPile(Piles.threshold.drawPile));
    Piles.threshold.addToDrawPile(thresholdCards);
    Piles.threshold.shuffle(7);

    // Reset Knowstones pile
    Piles.hold = [];
  }

})();
