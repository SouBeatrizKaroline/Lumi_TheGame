class Player {
  constructor(x, y) { this.x = x; this.y = y; this.width = CONFIG.PLAYER.WIDTH; this.height = CONFIG.PLAYER.HEIGHT; this.vx = 0; this.vy = 0; this.isGrounded = false; this.isRespawning = false; this.facingRight = true; this.keys = { jumpPressed: false }; this.stars = 0; this.powerLevel = 0; this.powerReady = false; this.powerActive = false; this.powerTime = 0; this.doubleJumpUsed = false; }
  setStars(count) { this.stars = count; const next = count >= 15 ? 3 : count >= 10 ? 2 : count >= 5 ? 1 : 0; if (next > this.powerLevel) { this.powerLevel = next; this.powerReady = true; } }
  useStarPower() { if (!this.powerReady || this.powerActive) return false; this.powerReady = false; this.powerActive = true; this.powerTime = this.powerLevel === 3 ? 8 : this.powerLevel === 2 ? 6 : 4; if (this.powerLevel === 1) this.vy = CONFIG.PLAYER.JUMP_VELOCITY * 1.25; return true; }
  update(dt, level) {
    const left = this.keys.left, right = this.keys.right; if (this.powerActive) { this.powerTime -= dt; if (this.powerTime <= 0) this.powerActive = false; }
    const target = (right ? 1 : 0) - (left ? 1 : 0); const speed = (this.keys.run ? CONFIG.PLAYER.RUN_SPEED : CONFIG.PLAYER.WALK_SPEED) * (this.powerActive && this.powerLevel >= 2 ? 1.45 : 1);
    this.vx += (target * speed - this.vx) * Math.min(1, CONFIG.PLAYER.ACCEL * dt / speed); if (target) this.facingRight = target > 0;
    this.vy = Math.min(CONFIG.PLAYER.MAX_FALL_SPEED, this.vy + CONFIG.PLAYER.GRAVITY * dt);
    if (this.keys.jumpPressed && this.isGrounded) { this.vy = CONFIG.PLAYER.JUMP_VELOCITY; this.isGrounded = false; this.doubleJumpUsed = false; this.keys.jumpPressed = false; } else if (this.keys.jumpPressed && !this.isGrounded && this.powerActive && this.powerLevel >= 2 && !this.doubleJumpUsed) { this.vy = CONFIG.PLAYER.JUMP_VELOCITY; this.doubleJumpUsed = true; this.keys.jumpPressed = false; }
    this.x = Math.max(0, Math.min(CONFIG.WORLD.WIDTH - this.width, this.x + this.vx * dt)); this.y += this.vy * dt; this.isGrounded = false;
    for (const p of level.platforms) if (this.x + this.width > p.x && this.x < p.x + p.w && this.y + this.height >= p.y && this.y + this.height <= p.y + 35 && this.vy >= 0) { this.y = p.y - this.height; this.vy = 0; this.isGrounded = true; }
    if (this.y > CONFIG.WORLD.DEATH_PIT_Y && !(this.powerActive && this.powerLevel >= 3)) level.triggerHazardRespawn(this, window.gameInstance.particles, window.soundEngine);
  }
  pulsePendantOnCollect() {}
  draw(ctx) { ctx.fillStyle = '#111321'; ctx.fillRect(this.x, this.y + 10, this.width, this.height - 10); ctx.fillStyle = '#d6a36d'; ctx.beginPath(); ctx.arc(this.x + 22, this.y + 12, 15, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ffd15c'; ctx.fillRect(this.x + 14, this.y + 10, 4, 4); ctx.fillRect(this.x + 27, this.y + 10, 4, 4); ctx.strokeStyle = '#5f9fe8'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(this.x + 5, this.y + 27); ctx.lineTo(this.x - 8, this.y + 38); ctx.stroke(); }
}
window.Player = Player;
