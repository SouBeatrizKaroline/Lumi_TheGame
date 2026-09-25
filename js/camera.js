/**
 * Lumi & the Lost Stars
 * Camera System
 */
class Camera {
  constructor(viewportWidth, viewportHeight, worldWidth, worldHeight) {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.lerpX = 0.08;
    this.lerpY = 0.06;

    this.offsetX = viewportWidth * 0.38;
    this.offsetY = viewportHeight * 0.55;

    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;
    this.shakeOffsetX = 0;
    this.shakeOffsetY = 0;

    this.isCutscene = false;
    this.cutsceneTargetX = null;
    this.cutsceneTargetY = null;
    this.zoom = 1.0;
    this.targetZoom = 1.0;
  }

  follow(target, dt) {
    if (this.isCutscene) {
      if (this.cutsceneTargetX !== null) {
        this.x += (this.cutsceneTargetX - this.x) * 0.035;
      }
      if (this.cutsceneTargetY !== null) {
        this.y += (this.cutsceneTargetY - this.y) * 0.035;
      }
      this.zoom += (this.targetZoom - this.zoom) * 0.02;
    } else {
      const lookAhead = target.facingRight ? 40 : -40;
      this.targetX = target.x + lookAhead - this.offsetX;
      this.targetY = target.y - this.offsetY;

      this.x += (this.targetX - this.x) * this.lerpX;
      this.y += (this.targetY - this.y) * this.lerpY;
      this.zoom = 1.0;
    }

    if (this.shakeIntensity > 0.1 && window.gameSettings && window.gameSettings.screenShake && !window.gameSettings.reduceMotion) {
      this.shakeOffsetX = (Math.random() * 2 - 1) * this.shakeIntensity;
      this.shakeOffsetY = (Math.random() * 2 - 1) * this.shakeIntensity;
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeIntensity = 0;
      this.shakeOffsetX = 0;
      this.shakeOffsetY = 0;
    }

    const effectiveViewportW = this.viewportWidth / this.zoom;
    const effectiveViewportH = this.viewportHeight / this.zoom;

    const maxX = Math.max(0, this.worldWidth - effectiveViewportW);
    const maxY = Math.max(0, this.worldHeight - effectiveViewportH);

    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }

  shake(amount) {
    if (window.gameSettings && window.gameSettings.reduceMotion) return;
    this.shakeIntensity = Math.min(this.shakeIntensity + amount, 22);
  }

  setCutsceneMode(active, targetX = null, targetY = null, targetZoom = 1.0) {
    this.isCutscene = active;
    this.cutsceneTargetX = targetX;
    this.cutsceneTargetY = targetY;
    this.targetZoom = targetZoom;
  }

  applyTransform(ctx) {
    ctx.save();
    if (this.zoom !== 1.0) {
      ctx.translate(this.viewportWidth * 0.5, this.viewportHeight * 0.5);
      ctx.scale(this.zoom, this.zoom);
      ctx.translate(-this.viewportWidth * 0.5, -this.viewportHeight * 0.5);
    }
    ctx.translate(
      -Math.floor(this.x + this.shakeOffsetX),
      -Math.floor(this.y + this.shakeOffsetY)
    );
  }

  restoreTransform(ctx) {
    ctx.restore();
  }
}

window.Camera = Camera;
