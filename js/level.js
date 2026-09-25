/**
 * Lunara: As Estrelas Perdidas
 * Level Geography & Collision Architecture
 */
class Level {
  constructor() {
    this.platforms = [];
    this.waterZones = [];
    this.decorativeProps = [];
    this.checkpointsData = [];
    this.collectiblesData = [];
    this.treeAltarX = 6480;
    this.treeAltarY = 820;
    this.hasTriggeredEnding = false;
  }

  init() {
    this.platforms = [];
    this.waterZones = [];
    this.decorativeProps = [];

    // 1. INÍCIO DA FLORESTA (x: 0 - 1150)
    this.addPlatform(0, 820, 1180, 280, false, 'grass');
    this.addPlatform(340, 720, 140, 30, true, 'stone');
    this.addPlatform(540, 640, 160, 30, true, 'wood');
    this.addPlatform(760, 560, 150, 30, true, 'stone');
    this.addPlatform(960, 710, 140, 30, true, 'grass');

    this.addProp('stone_lantern', 280, 820);
    this.addProp('small_mushrooms', 480, 820);
    this.addProp('ancient_sign', 180, 820);
    this.addProp('flowers', 620, 820);

    // 2. BOSQUE DOS COGUMELOS (x: 1150 - 2450)
    this.addPlatform(1180, 820, 480, 280, false, 'grass');
    this.addMushroom(1540, 790, 88, 30);
    this.addPlatform(1480, 570, 220, 28, true, 'branch');
    this.addPlatform(1760, 470, 200, 28, true, 'wood');
    this.addMushroom(1920, 790, 96, 30);
    this.addPlatform(1840, 350, 180, 26, true, 'branch');
    this.addPlatform(2020, 380, 120, 24, true, 'secret_branch');
    this.addPlatform(1800, 820, 680, 280, false, 'grass');

    this.addProp('glowing_mushrooms_cluster', 1350, 820);
    this.addProp('giant_stem', 1584, 820);
    this.addProp('giant_stem', 1968, 820);
    this.addProp('glowing_mushrooms_cluster', 2240, 820);

    // 3. PONTE ANTIGA & DESPENHADEIRO (x: 2450 - 3650)
    this.addPlatform(2450, 800, 240, 300, false, 'stone');
    this.addPlatform(2690, 800, 170, 22, true, 'bridge');
    this.addPlatform(2880, 790, 180, 22, true, 'bridge');
    this.addPlatform(3080, 785, 180, 22, true, 'bridge');
    this.addPlatform(3280, 795, 170, 22, true, 'bridge');
    this.addPlatform(2940, 920, 140, 24, true, 'ruined_stone');
    this.addPlatform(3100, 920, 130, 24, true, 'ruined_stone');
    this.addPlatform(3450, 800, 240, 300, false, 'stone');

    this.addProp('bridge_post_lantern', 2680, 800);
    this.addProp('bridge_post_lantern', 3450, 800);
    this.addProp('hanging_ivy', 2900, 810);

    // 4. RIACHO ENCANTADO & CASCATAS (x: 3650 - 4850)
    this.addPlatform(3650, 810, 200, 290, false, 'grass');
    this.addPlatform(3920, 820, 100, 30, false, 'stepping_stone');
    this.addPlatform(4090, 790, 110, 30, false, 'stepping_stone');
    this.addPlatform(4270, 750, 120, 30, false, 'stepping_stone');
    this.addPlatform(4450, 720, 110, 30, false, 'stepping_stone');
    this.addPlatform(4620, 760, 130, 30, false, 'stepping_stone');
    this.addPlatform(4180, 580, 160, 26, true, 'stone');
    this.addPlatform(4380, 500, 180, 26, true, 'branch');

    this.waterZones.push({
      x: 3820,
      y: 840,
      w: 1000,
      h: 260
    });

    this.addProp('waterfall', 4280, 840);
    this.addProp('water_reeds', 3900, 830);
    this.addProp('water_reeds', 4600, 830);
    this.addProp('glowing_lily', 4020, 845);
    this.addProp('glowing_lily', 4380, 845);

    // 5. CLAREIRA MÍSTICA (x: 4850 - 5950)
    this.addPlatform(4820, 800, 1150, 300, false, 'grass');
    this.addPlatform(5020, 690, 140, 28, true, 'ruined_stone');
    this.addPlatform(5210, 590, 160, 28, true, 'ruined_stone');
    this.addPlatform(5420, 480, 180, 28, true, 'branch');
    this.addPlatform(5640, 530, 120, 24, true, 'secret_branch');
    this.addPlatform(5650, 680, 160, 28, true, 'ruined_stone');

    this.addProp('ruin_arch', 5100, 800);
    this.addProp('crystal_cluster', 5320, 800);
    this.addProp('blooming_bushes', 5550, 800);

    // 6. ÁRVORE ANCESTRAL & ALTAR SAGRADO (x: 5950 - 7200)
    this.addPlatform(5950, 810, 1250, 290, false, 'ancient_soil');
    this.addPlatform(6220, 770, 160, 40, false, 'stone');
    this.addPlatform(6380, 730, 180, 80, false, 'stone');

    this.addProp('ancient_tree_monument', 6480, 810);
    this.addProp('celestial_altar', 6440, 730);

    // Checkpoints
    this.checkpointsData = [
      { id: 'cp1', x: 140, y: 820, name: 'Início da Floresta' },
      { id: 'cp2', x: 1260, y: 820, name: 'Bosque dos Cogumelos' },
      { id: 'cp3', x: 2520, y: 800, name: 'Entrada da Ponte Antiga' },
      { id: 'cp4', x: 3710, y: 810, name: 'Margem do Riacho' },
      { id: 'cp5', x: 4940, y: 800, name: 'Clareira Mística' },
      { id: 'cp6', x: 6080, y: 810, name: 'Santuário da Árvore' }
    ];

    // Collectibles (20 Main + 3 Secret)
    this.collectiblesData = [
      { id: 's1', x: 280, y: 760, isSecret: false },
      { id: 's2', x: 410, y: 660, isSecret: false },
      { id: 's3', x: 830, y: 500, isSecret: false },
      { id: 's4', x: 1360, y: 750, isSecret: false },
      { id: 's5', x: 1580, y: 510, isSecret: false },
      { id: 's6', x: 1850, y: 410, isSecret: false },
      { id: 's7', x: 1960, y: 640, isSecret: false },
      { id: 'sec1', x: 2080, y: 330, isSecret: true, hint: 'Copa dos Cogumelos' },
      { id: 's8', x: 2750, y: 730, isSecret: false },
      { id: 's9', x: 2970, y: 720, isSecret: false },
      { id: 's10', x: 3170, y: 720, isSecret: false },
      { id: 's11', x: 3370, y: 730, isSecret: false },
      { id: 'sec2', x: 3160, y: 870, isSecret: true, hint: 'Sob a Ponte Antiga' },
      { id: 's12', x: 3970, y: 760, isSecret: false },
      { id: 's13', x: 4150, y: 730, isSecret: false },
      { id: 's14', x: 4330, y: 690, isSecret: false },
      { id: 's15', x: 4470, y: 440, isSecret: false },
      { id: 's16', x: 5090, y: 630, isSecret: false },
      { id: 's17', x: 5290, y: 530, isSecret: false },
      { id: 's18', x: 5510, y: 420, isSecret: false },
      { id: 's19', x: 5720, y: 620, isSecret: false },
      { id: 'sec3', x: 5700, y: 480, isSecret: true, hint: 'Arco das Ruínas' },
      { id: 's20', x: 6470, y: 680, isSecret: false }
    ];
  }

  addPlatform(x, y, w, h, oneWay = false, style = 'grass') {
    this.platforms.push({ x, y, w, h, oneWay, style, isMushroom: false });
  }

  addMushroom(x, y, w, h) {
    this.platforms.push({ x, y, w, h, oneWay: true, style: 'mushroom', isMushroom: true });
  }

  addProp(type, x, y) {
    this.decorativeProps.push({ type, x, y });
  }

  triggerHazardRespawn(player, particles, sound) {
    if (player.isRespawning) return;
    player.isRespawning = true;
    particles.spawnRespawnDust(player.x + player.width * 0.5, player.y + player.height * 0.5);

    if (window.gameInstance && window.gameInstance.checkpoints) {
      window.gameInstance.checkpoints.respawnPlayer(player, particles, sound);
    }
  }

  render(ctx, camera, forestProgress = 0) {
    const viewL = camera.x - 100;
    const viewR = camera.x + camera.viewportWidth + 100;
    const viewT = camera.y - 100;
    const viewB = camera.y + camera.viewportHeight + 100;

    for (const plat of this.platforms) {
      if (plat.x + plat.w < viewL || plat.x > viewR || plat.y + plat.h < viewT || plat.y > viewB) {
        continue;
      }
      this.drawPlatform(ctx, plat, forestProgress);
    }

    for (const water of this.waterZones) {
      if (water.x + water.w < viewL || water.x > viewR) continue;
      this.drawWater(ctx, water, forestProgress);
    }

    for (const prop of this.decorativeProps) {
      if (prop.x + 120 < viewL || prop.x - 120 > viewR) continue;
      this.drawProp(ctx, prop, forestProgress);
    }
  }

  drawPlatform(ctx, plat, forestProgress) {
    ctx.save();

    if (plat.isMushroom) {
      const cx = plat.x + plat.w * 0.5;
      const cy = plat.y + plat.h * 0.8;
      const capRadiusX = plat.w * 0.58;
      const capRadiusY = plat.h * 0.95;

      const glowAlpha = 0.2 + forestProgress * 0.55;
      const glowGrad = ctx.createRadialGradient(cx, cy - 8, 2, cx, cy - 8, capRadiusX * 1.5);
      glowGrad.addColorStop(0, `rgba(182, 95, 255, ${glowAlpha})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 8, capRadiusX * 1.5, capRadiusY * 1.6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ecd8c4';
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx - 8, cy + 30);
      ctx.lineTo(cx + 8, cy + 30);
      ctx.lineTo(cx + 10, cy);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx, cy - 4, capRadiusX, capRadiusY, 0, Math.PI, 0);
      ctx.closePath();

      const capGrad = ctx.createLinearGradient(cx, cy - capRadiusY, cx, cy);
      capGrad.addColorStop(0, forestProgress > 0.4 ? '#c863ff' : '#883bb8');
      capGrad.addColorStop(1, forestProgress > 0.4 ? '#4a1f80' : '#2b104c');
      ctx.fillStyle = capGrad;
      ctx.fill();

      ctx.strokeStyle = '#e8a8ff';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = forestProgress > 0.25 ? '#7bf7ff' : 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(cx - 16, cy - 14, 4, 0, Math.PI * 2);
      ctx.arc(cx + 12, cy - 16, 5, 0, Math.PI * 2);
      ctx.arc(cx, cy - 20, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      return;
    }

    if (plat.style === 'bridge') {
      ctx.fillStyle = '#4a3325';
      ctx.beginPath();
      ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 4);
      ctx.fill();

      ctx.strokeStyle = '#2b1b11';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.strokeStyle = '#1e130c';
      for (let bx = plat.x + 18; bx < plat.x + plat.w; bx += 20) {
        ctx.beginPath();
        ctx.moveTo(bx, plat.y);
        ctx.lineTo(bx, plat.y + plat.h);
        ctx.stroke();
      }
      ctx.restore();
      return;
    }

    const baseCol = plat.style === 'stone' || plat.style === 'ruined_stone' ? '#1f253d' : '#141829';
    const topCol = plat.style === 'branch' ? '#3d2b20' : (forestProgress > 0.5 ? '#246b4f' : '#1b3b2f');

    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 6);
    ctx.fill();

    ctx.fillStyle = topCol;
    ctx.beginPath();
    ctx.roundRect(plat.x, plat.y, plat.w, 10, [6, 6, 0, 0]);
    ctx.fill();

    ctx.strokeStyle = forestProgress > 0.7 ? '#4de3a5' : 'rgba(182, 152, 247, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }

  drawWater(ctx, water, forestProgress) {
    ctx.save();
    const time = Date.now() * 0.003;
    const waveAmp = 4;
    const numPoints = Math.floor(water.w / 14);

    ctx.beginPath();
    ctx.moveTo(water.x, water.y);
    for (let i = 0; i <= numPoints; i++) {
      const wx = water.x + i * 14;
      const wy = water.y + Math.sin(time + i * 0.45) * waveAmp;
      ctx.lineTo(wx, wy);
    }
    ctx.lineTo(water.x + water.w, water.y + water.h);
    ctx.lineTo(water.x, water.y + water.h);
    ctx.closePath();

    const waterGrad = ctx.createLinearGradient(0, water.y, 0, water.y + water.h);
    const topWaterAlpha = 0.55 + forestProgress * 0.35;
    waterGrad.addColorStop(0, `rgba(45, 185, 175, ${topWaterAlpha})`);
    waterGrad.addColorStop(1, 'rgba(8, 14, 38, 0.95)');
    ctx.fillStyle = waterGrad;
    ctx.fill();

    ctx.strokeStyle = forestProgress > 0.4 ? '#9efff6' : 'rgba(150, 220, 240, 0.4)';
    ctx.lineWidth = 2.0;
    ctx.stroke();

    if (forestProgress >= 0.5) {
      ctx.fillStyle = '#ffffff';
      for (let s = water.x + 30; s < water.x + water.w - 30; s += 80) {
        const sx = s + Math.sin(time * 0.8 + s) * 16;
        const sy = water.y + 12 + Math.cos(time + s) * 6;
        ctx.globalAlpha = 0.4 + Math.sin(time * 2 + s) * 0.3;
        ctx.fillRect(sx, sy, 8, 2);
      }
    }
    ctx.restore();
  }

  drawProp(ctx, prop, forestProgress) {
    ctx.save();
    ctx.translate(prop.x, prop.y);

    if (prop.type === 'stone_lantern') {
      ctx.fillStyle = '#222942';
      ctx.fillRect(-10, -44, 20, 44);
      ctx.beginPath();
      ctx.moveTo(-16, -44);
      ctx.lineTo(0, -56);
      ctx.lineTo(16, -44);
      ctx.closePath();
      ctx.fill();

      const glowGrad = ctx.createRadialGradient(0, -32, 2, 0, -32, 34);
      glowGrad.addColorStop(0, 'rgba(255, 214, 92, 0.85)');
      glowGrad.addColorStop(0.5, 'rgba(255, 185, 45, 0.3)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, -32, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffe89e';
      ctx.fillRect(-5, -36, 10, 8);
    } else if (prop.type === 'glowing_mushrooms_cluster') {
      const glow = forestProgress > 0.25;
      const mCol = glow ? '#4de3d0' : '#453860';
      ctx.fillStyle = mCol;
      ctx.beginPath();
      ctx.ellipse(-12, -12, 10, 7, -0.2, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(8, -16, 12, 8, 0.15, Math.PI, 0);
      ctx.fill();

      if (glow) {
        ctx.shadowColor = '#4de3d0';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#e6ffff';
        ctx.beginPath();
        ctx.arc(-12, -12, 2, 0, Math.PI * 2);
        ctx.arc(8, -16, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (prop.type === 'bridge_post_lantern') {
      ctx.fillStyle = '#3a271c';
      ctx.fillRect(-4, -60, 8, 60);
      ctx.fillRect(-4, -60, 20, 5);

      const lanternX = 14;
      const lanternY = -48;
      const lampGrad = ctx.createRadialGradient(lanternX, lanternY, 2, lanternX, lanternY, 32);
      lampGrad.addColorStop(0, 'rgba(255, 215, 95, 0.9)');
      lampGrad.addColorStop(0.6, 'rgba(255, 175, 45, 0.25)');
      lampGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lampGrad;
      ctx.beginPath();
      ctx.arc(lanternX, lanternY, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffdf7a';
      ctx.fillRect(lanternX - 4, lanternY - 6, 8, 12);
      ctx.strokeStyle = '#2b1b11';
      ctx.strokeRect(lanternX - 4, lanternY - 6, 8, 12);
    } else if (prop.type === 'waterfall') {
      const time = Date.now() * 0.005;
      const wfGrad = ctx.createLinearGradient(0, -180, 0, 0);
      wfGrad.addColorStop(0, 'rgba(160, 240, 235, 0.4)');
      wfGrad.addColorStop(1, 'rgba(75, 210, 200, 0.85)');
      ctx.fillStyle = wfGrad;
      ctx.fillRect(-22, -180, 44, 180);

      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.55;
      for (let i = 0; i < 5; i++) {
        const fy = -160 + ((time * 70 + i * 35) % 170);
        ctx.fillRect(-18 + Math.sin(time + i) * 4, fy, 36, 4);
      }
    } else if (prop.type === 'celestial_altar') {
      ctx.fillStyle = '#263154';
      ctx.beginPath();
      ctx.roundRect(-24, -20, 48, 20, 4);
      ctx.fill();

      ctx.strokeStyle = forestProgress >= 1.0 ? '#ffd15c' : '#4f6096';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      if (forestProgress >= 1.0) {
        ctx.fillStyle = '#ffeaa6';
        ctx.shadowColor = '#ffd15c';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, -10, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

window.Level = Level;
