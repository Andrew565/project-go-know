
export function setupDOM() {
  document.body.innerHTML = `
    <template id="faceUpCardTemplate">
      <div class="gk-card">
        <div class="gk-card__rank"></div>
        <div class="gk-card__suit"></div>
      </div>
    </template>
    <template id="faceDownCardTemplate">
      <div class="gk-card gk-card--back"></div>
    </template>

    <div id="knowbleDiscard"></div>
    <div id="threshold"></div>
    <div id="activeKnowble"></div>
    <div id="activeObstacle"></div>
    <div id="veil"></div>
    <div id="source"></div>
    <div id="discard"></div>
    <div id="hold"></div>

    <div id="trialScore">0</div>
    <div id="trialDifficulty">0</div>
    <div id="currentScore">0</div>
    <div id="currentEffort">0</div>

    <button id="playTheseCardsButton" disabled>Play</button>

    <div id="i1"></div>
    <div id="i2"></div>
    <div id="i3"></div>
    <div id="i4"></div>
    <div id="i5"></div>
    <div id="i6"></div>
    <div id="i7" class="pile--locked"></div>
  `;
}
