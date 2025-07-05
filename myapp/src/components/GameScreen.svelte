<script lang="ts">
  import { writable } from 'svelte/store';

  interface Driver {
    name: string;
    position: number; // grid position
    tyres: string; // e.g. "Soft", "Medium", "Hard"
  }

  interface EventCard {
    id: number;
    title: string;
    description: string;
  }

  // Drivers on grid
  let drivers: Driver[] = [
    { name: 'Mia Vargas', position: 1, tyres: 'Soft' },
    { name: 'Theo Blake', position: 2, tyres: 'Medium' },
    { name: 'Lucas Rey', position: 3, tyres: 'Hard' },
    { name: 'Anna Ford', position: 4, tyres: 'Soft' },
  ];

  // Player's event cards to choose from
  let eventCards: EventCard[] = [
    { id: 1, title: 'Attack Corner', description: 'Attempt to overtake in corner' },
    { id: 2, title: 'Defend Position', description: 'Hold your current position' },
    { id: 3, title: 'Push Hard', description: 'Increase pace but risk tyres' },
  ];

  let raceStarted = false;
  let lap = 0;
  let sector = 0;

  function startRace() {
    raceStarted = true;
    lap = 1;
    sector = 1;
  }

  function nextSector() {
    sector++;
    if (sector > 3) {
      sector = 1;
      lap++;
    }
  }

  function playEventCard(card: EventCard) {
    alert(`Played card: ${card.title} — ${card.description}`);
    // Add game logic here for card effect
  }
</script>

<style>
  .game-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    background: #121212;
    color: white;
    font-family: Arial, sans-serif;
    gap: 1rem;
    padding: 1rem;
  }

  .map-section {
    flex: 1;
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .map-section img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
  }

  .info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .grid-order, .event-cards, .race-director, .race-info {
    background: #222;
    padding: 1rem;
    border-radius: 8px;
  }

  .grid-order h3, .event-cards h3, .race-director h3, .race-info h3 {
    margin-bottom: 0.5rem;
  }

  .driver-item {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    border-bottom: 1px solid #444;
  }

  .event-card {
    background: #333;
    padding: 0.75rem 1rem;
    margin: 0.25rem;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
  }

  .event-card:hover {
    background: #00bb99;
  }

  .event-cards .cards-row {
    display: flex;
    flex-wrap: wrap;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #0af;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover:not(:disabled) {
    background: #08c;
  }

  button:disabled {
    background: #555;
    cursor: not-allowed;
  }
</style>

<div class="game-container">
  <div class="map-section">
    <!-- Replace with your local image path -->
    <img src="/assets/tracks/MonacoGP.png" alt="Race Track Map" />
  </div>

  <div class="info-section">

    <div class="race-info">
      <h3>Race Info</h3>
      <p>Lap: {lap} &nbsp;&nbsp; Sector: {sector}</p>
      <button on:click={nextSector} disabled={!raceStarted}>Next Sector</button>
    </div>

    <div class="grid-order">
      <h3>Grid Order</h3>
      {#each drivers as driver (driver.position)}
        <div class="driver-item">
          <div>#{driver.position} {driver.name}</div>
          <div>Tyres: {driver.tyres}</div>
        </div>
      {/each}
    </div>

    <div class="event-cards">
      <h3>Your Event Cards</h3>
      <div class="cards-row">
        {#each eventCards as card}
          <div class="event-card" on:click={() => playEventCard(card)}>
            {card.title}
          </div>
        {/each}
      </div>
    </div>

    <div class="race-director">
      <h3>Race Director</h3>
      <button on:click={startRace} disabled={raceStarted}>
        {raceStarted ? 'Race Started' : 'Start Race'}
      </button>
    </div>

  </div>
</div>
