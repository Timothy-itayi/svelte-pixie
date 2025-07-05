<script>
  export let lap = 4;
  export let totalLaps = 7;
  export let position = 3;
  export let weather = "🌧️";
  export let tyres = "Soft";
</script>

<div class="status-bar">
  Lap: {lap}/{totalLaps} | Position: P{position} | Weather: {weather} | Tyres: {tyres}
</div>

<style>
  .status-bar {
    background: #000;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-bottom: 1px solid #333;
  }
</style>
