class ParticleSystem {
  constructor() { this.items = []; }
  spawnStarCollect(x, y) { this.spawnBurst(x, y, '#ffd15c'); }
  spawnStarBurst(x, y, isSecret = false) { this.spawnBurst(x, y, isSecret ? '#d38fff' : '#ffd15c'); }
  spawnSecretCollect(x, y) { this.spawnBurst(x, y, '#d38fff'); }
  spawnCheckpointActivate(x, y) { this.spawnBurst(x, y, '#32b5a1'); }
  spawnCheckpointBurst(x, y) { this.spawnBurst(x, y, '#32b5a1'); }
  spawnFloatingText(x, y, text, color = '#fff0a6') { this.items.push({ x, y, vx: 0, vy: -25, life: 1, text, color }); }
  spawnBurst(x, y, color) { for (let i = 0; i < 14; i++) this.items.push({ x, y, vx: (Math.random() - .5) * 180, vy: (Math.random() - .7) * 180, life: .8, color }); }
  spawnRespawnDust(x, y) { for (let i = 0; i < 12; i++) this.items.push({ x, y, vx: (Math.random() - .5) * 120, vy: -Math.random() * 100, life: .7 }); }
  update(dt) { this.items = this.items.filter(p => (p.life -= dt) > 0); this.items.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 180 * dt; }); }
  draw(ctx) { this.items.forEach(p => { ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color || '#ffd15c'; if (p.text) ctx.fillText(p.text, p.x, p.y); else ctx.fillRect(p.x - 2, p.y - 2, 4, 4); }); ctx.globalAlpha = 1; }
}
window.ParticleSystem = ParticleSystem;
