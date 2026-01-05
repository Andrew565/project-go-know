
import { setupDOM } from './test-utils/dom-setup';

// Setup DOM before requiring the module so that top-level document.getElementById calls work
setupDOM();

jest.mock('@andrewscripts/deck-of-cards.js', () => {
    // Generate mock cards
    // 0-8: 2-10
    // 9: Jack
    // 10: Queen
    // 11: King
    // 12: Ace
    // 99: Joker
    const cards = [];
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const ranks = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

    // Create standard deck
    suits.forEach(suit => {
        ranks.forEach((rank, index) => {
            cards.push({
                numberRank: index,
                nameRank: rank,
                suit: suit,
                name: `${rank} of ${suit}`,
                value: index // temp
            });
        });
    });

    // Add Jokers
    cards.push({ numberRank: 99, nameRank: 'Joker', suit: 'Joker' });
    cards.push({ numberRank: 99, nameRank: 'Joker', suit: 'Joker' });

    return {
        DeckOfCards: class MockDeck {
            /**
         * @param {any} c
         */
            constructor(c) {
                this.drawPile = c ? [...c] : [];
                /**
               * @type {any[]}
               */
                this.discardPile = [];
            }
            /**
         * @param {number | undefined} n
         */
            drawFromDrawPile(n) {
                return this.drawPile.splice(0, n);
            }
            /**
         * @param {any} c
         */
            addToDiscardPile(c) {
                this.discardPile.push(...c);
            }
            /**
         * @param {any} c
         */
            addToDrawPile(c) {
                this.drawPile.push(...c);
            }
            /**
         * @param {any} n
         */
            shuffle(n) {}
        },
        StandardCards: {
            standard52DeckOfCardsWithJokers: cards
        }
    };
});

const {
  NewGame,
  Piles,
  Counters,
  updateCounters,
  playCards,
  renderPiles,
  drawObstaclesFor
} = require('./index');

describe('Game Logic', () => {
  beforeEach(() => {
    // Reset game state before each test
    NewGame();
    // Clear mocks if any
    jest.clearAllMocks();
  });

  test('NewGame should initialize piles correctly', () => {
    // Check initial state
    expect(Piles.source.drawPile.length).toBeGreaterThan(0);
    expect(Piles.threshold.drawPile.length).toBeGreaterThan(0);
    // thresholdActive should have a card
    expect(Piles.thresholdActive).not.toBeNull();
    // veil should have obstacles
    expect(Piles.veil.drawPile.length).toBeGreaterThan(0);
    // obstaclesActive should be populated based on thresholdActive
    if (Piles.thresholdActive) {
        // Just check if it ran logic, length depends on card drawn
        expect(Piles.obstaclesActive.length).toBeGreaterThanOrEqual(1);
    }

    // Inventory should be populated (i1-i6)
    for (let i = 1; i <= 6; i++) {
        expect(Piles.inventory[`i${i}`].card).not.toBeNull();
    }
  });

  test('updateCounters should calculate score correctly', () => {
    // Manually set state to unpredictable but known values
    Piles.thresholdActive = { value: 10, suit: 'Hearts', nameRank: '10' };
    Piles.obstaclesActive = [{ value: 5, suit: 'Spades' }];

    // Select some cards
    Piles.inventory['i1'].card = { value: 5, suit: 'Hearts' };
    Piles.inventory['i1'].selected = true;

    updateCounters();

    // Target Score = 10 (Knowble) + 5 (Obstacle) = 15
    expect(Counters.trialScore).toBe(15);

    // Current Score = 5 (Selected card)
    expect(Counters.currentScore).toBe(5);
    expect(Counters.currentEffort).toBe(1); // 1 card selected
  });

  test('playCards should move cards to hold if score is sufficient', () => {
     // Setup a winning scenario
     // Knowble: Value 2
     Piles.thresholdActive = { value: 2, suit: 'Clubs', nameRank: '2' };
     Piles.obstaclesActive = [{ value: 1, suit: 'Spades', nameRank: 'Ace' }]; // Must have obstacle

     // Inventory: Select a card worth 5 (Clubs)
     Piles.inventory['i1'].card = { value: 5, suit: 'Clubs' };
     Piles.inventory['i1'].selected = true;

     // Mock updateCounters to ensure button enabling logic (though playCards calls logic directly)
     updateCounters();

     // Play
     playCards();

     // Verify:
     // Knowble should be in hold
     expect(Piles.hold).toContainEqual({ value: 2, suit: 'Clubs', nameRank: '2' });
     // Inventory card should be discarded (moved to inventoryDiscard or handled)
     // Actually playCards pushes to inventoryDiscard and draws new card
     expect(Piles.inventoryDiscard).toContainEqual({ value: 5, suit: 'Clubs' });
     expect(Piles.inventory['i1'].selected).toBe(false);
     expect(Piles.inventory['i1'].card).not.toEqual({ value: 5, suit: 'Clubs' }); // Should be new card
  });

  test('playCards should discard knowble if score is insufficient', () => {
      // Setup a losing scenario
      Piles.thresholdActive = { value: 10, suit: 'Hearts', nameRank: '10' };
      Piles.obstaclesActive = [{ value: 1, suit: 'Spades', nameRank: 'Ace' }];

      // Select card worth 2 (Hearts)
      Piles.inventory['i1'].card = { value: 2, suit: 'Hearts' };
      Piles.inventory['i1'].selected = true;

      playCards();

      // Knowble should be in thresholdDiscard
      expect(Piles.thresholdDiscard).toContainEqual({ value: 10, suit: 'Hearts', nameRank: '10' });
      // Inventory card discarded
      expect(Piles.inventoryDiscard).toContainEqual({ value: 2, suit: 'Hearts' });
  });

  test('drawObstaclesFor should draw 2 obstacles for King of Clubs', () => {
      // Create a King of Clubs
      const kingClubs = { nameRank: 'King', suit: 'Clubs', value: 13 };

      // Ensure veil has enough cards
      // Piles.veil.drawPile is populated by NewGame/InitPiles

      drawObstaclesFor(kingClubs);

      expect(Piles.obstaclesActive.length).toBe(2);
  });

  test('drawObstaclesFor should draw 1 obstacle for non-King of Clubs', () => {
      const queenHearts = { nameRank: 'Queen', suit: 'Hearts', value: 12 };

      drawObstaclesFor(queenHearts);

      expect(Piles.obstaclesActive.length).toBe(1);
  });
});
