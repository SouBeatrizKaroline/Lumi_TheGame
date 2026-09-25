class World { draw(ctx, camera, progress) { ctx.fillStyle = progress > .5 ? '#20254a' : '#0b1029'; ctx.fillRect(0, 0, CONFIG.VIEWPORT.WIDTH, CONFIG.VIEWPORT.HEIGHT); ctx.fillStyle = '#ffd15c'; for (let i = 0; i < 45; i++) { const x = (i * 173 - camera.x * .15) % CONFIG.VIEWPORT.WIDTH; const y = 35 + (i * 67) % 300; ctx.fillRect(x, y, 2, 2); } } }
window.World = World;
