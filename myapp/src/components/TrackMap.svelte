<script lang="ts">
  import { onMount } from 'svelte';
  import { Application, Assets, Texture, Sprite } from 'pixi.js';
  import { myPluginInit } from '../lib/myPlugin';
  

  let canvasEl: HTMLCanvasElement | null = null;

  onMount(async () => {
    if (!canvasEl) return;

    // ✅ Create and initialize application properly
    const app = new Application();
    await app.init({
      view: canvasEl,
      width: 800,
      height: 500,
      backgroundColor: 0x111111,
    });

    // ✅ Initialize plugin
    myPluginInit({ customOption: true });

    // ✅ Load texture
    const texture: Texture = await Assets.load('/assets/tracks/MonacoGP.png');

    // ✅ Create a sprite directly from the texture
    const track = new Sprite(texture);
    track.width = 800;
    track.height = 500;
    app.stage.addChild(track);

    // ✅ Optional: if you really want to use Graphics with fill
    // const gfx = new Graphics();
    // gfx.rect(0, 0, 400, 300).fill({ texture });
    // app.stage.addChild(gfx);
  });
</script>

<canvas bind:this={canvasEl}></canvas>
