<script lang="ts">
  import GameScreen from '../components/GameScreen.svelte';

  // Screen states
  type Screen = 'title' | 'select' | 'game';

  interface Driver {
    name: string;
    rcr: number;
    pce: number;
    exp: number;
    awr: number;
  }

  interface Team {
    name: string;
    str: number;
    pit: string;
    drivers: Driver[];
  }

  // 10 teams with 2 drivers each
  const teams: Team[] = [
    {
      name: 'Red Arrow GP',
      str: 88,
      pit: '2.3s',
      drivers: [
        { name: 'Mia Vargas', rcr: 92, pce: 87, exp: 70, awr: 80 },
        { name: 'Lucas Rey', rcr: 85, pce: 82, exp: 75, awr: 78 }
      ]
    },
    {
      name: 'Silver Edge',
      str: 72,
      pit: '2.0s',
      drivers: [
        { name: 'Theo Blake', rcr: 83, pce: 95, exp: 90, awr: 85 },
        { name: 'Anna Ford', rcr: 79, pce: 88, exp: 68, awr: 82 }
      ]
    },
    {
      name: 'Blue Falcon',
      str: 80,
      pit: '2.1s',
      drivers: [
        { name: 'Jin Park', rcr: 88, pce: 84, exp: 73, awr: 79 },
        { name: 'Sofia Martinez', rcr: 82, pce: 89, exp: 76, awr: 81 }
      ]
    },
    {
      name: 'Green Comet',
      str: 75,
      pit: '2.4s',
      drivers: [
        { name: 'Ethan Gray', rcr: 80, pce: 86, exp: 77, awr: 78 },
        { name: 'Maya Lin', rcr: 85, pce: 83, exp: 72, awr: 80 }
      ]
    },
    {
      name: 'Golden Hawk',
      str: 90,
      pit: '1.9s',
      drivers: [
        { name: 'Nina Scott', rcr: 93, pce: 90, exp: 88, awr: 84 },
        { name: 'Liam Watts', rcr: 87, pce: 85, exp: 81, awr: 83 }
      ]
    },
    {
      name: 'Crimson Bolt',
      str: 78,
      pit: '2.2s',
      drivers: [
        { name: 'Isabel King', rcr: 84, pce: 80, exp: 74, awr: 77 },
        { name: 'Noah Lane', rcr: 79, pce: 83, exp: 70, awr: 75 }
      ]
    },
    {
      name: 'Iron Titan',
      str: 85,
      pit: '2.1s',
      drivers: [
        { name: 'Oliver Chase', rcr: 90, pce: 88, exp: 85, awr: 82 },
        { name: 'Emma Reed', rcr: 86, pce: 84, exp: 79, awr: 80 }
      ]
    },
    {
      name: 'Silver Ghost',
      str: 77,
      pit: '2.3s',
      drivers: [
        { name: 'Zach Taylor', rcr: 81, pce: 79, exp: 73, awr: 76 },
        { name: 'Lara Wells', rcr: 78, pce: 82, exp: 70, awr: 77 }
      ]
    },
    {
      name: 'Shadow Lynx',
      str: 82,
      pit: '2.0s',
      drivers: [
        { name: 'Aaron Moss', rcr: 85, pce: 87, exp: 74, awr: 79 },
        { name: 'Elena Cruz', rcr: 83, pce: 86, exp: 76, awr: 81 }
      ]
    },
    {
      name: 'Vortex Falcons',
      str: 79,
      pit: '2.4s',
      drivers: [
        { name: 'Max Bennett', rcr: 80, pce: 85, exp: 72, awr: 78 },
        { name: 'Jade Morgan', rcr: 82, pce: 88, exp: 75, awr: 80 }
      ]
    }
  ];

  let screen: Screen = 'title';

  let selectedTeam: Team | null = null;
  let selectedDriver: Driver | null = null;

  function startSelection() {
    screen = 'select';
  }

  function resetSelection() {
    selectedTeam = null;
    selectedDriver = null;
  }

  function startRace() {
    if (selectedTeam && selectedDriver) {
      screen = 'game';
    }
  }
</script>

<style>
  .screen {
    color: white;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1.title {
    font-size: 4rem;
    margin-bottom: 3rem;
    user-select: none;
  }

  button {
    background-color: #0af;
    border: none;
    border-radius: 8px;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    color: white;
    cursor: pointer;
    margin: 1rem 0;
  }

  button:hover {
    background-color: #08c;
  }

  .select-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .card {
    background: #333;
    border-radius: 8px;
    padding: 1rem;
    min-width: 180px;
    cursor: pointer;
    border: 2px solid transparent;
    color: white;
    user-select: none;
  }

  .card.selected {
    border-color: #00ffcc;
    box-shadow: 0 0 10px #00ffcc;
  }

  h2 {
    margin-top: 2rem;
    font-weight: 600;
    user-select: none;
  }
</style>

{#if screen === 'title'}
  <div class="screen">
    <h1 class="title">Drive to Survive: Card Racing</h1>
    <button on:click={startSelection}>Start</button>
  </div>
{:else if screen === 'select'}
  <div class="screen">
    <h2>Select Your Team</h2>
    <div class="select-row">
      {#each teams as team}
        <div
          class="card {selectedTeam === team ? 'selected' : ''}"
          on:click={() => {
            selectedTeam = team;
            selectedDriver = null; // reset driver on team change
          }}
        >
          <strong>{team.name}</strong><br />
          STR: {team.str} | PIT: {team.pit}
        </div>
      {/each}
    </div>

    {#if selectedTeam}
      <h2>Select Your Driver</h2>
      <div class="select-row">
        {#each selectedTeam.drivers as driver}
          <div
            class="card {selectedDriver === driver ? 'selected' : ''}"
            on:click={() => (selectedDriver = driver)}
          >
            <strong>{driver.name}</strong><br />
            RCR: {driver.rcr}, PCE: {driver.pce}<br />
            EXP: {driver.exp}, AWR: {driver.awr}
          </div>
        {/each}
      </div>
    {/if}

    {#if selectedTeam && selectedDriver}
      <button on:click={startRace}>▶ Start Race</button>
    {/if}
  </div>
{:else if screen === 'game'}
  <GameScreen
 
  />
{/if}
