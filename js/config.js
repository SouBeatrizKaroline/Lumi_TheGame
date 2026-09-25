/**
 * Lunara: As Estrelas Perdidas
 * Global Configuration and Constants
 */
const CONFIG = {
  VIEWPORT: {
    WIDTH: 1280,
    HEIGHT: 720
  },
  WORLD: {
    WIDTH: 7200,
    HEIGHT: 1100,
    GROUND_Y: 820,
    DEATH_PIT_Y: 1040
  },
  PLAYER: {
    WIDTH: 44,
    HEIGHT: 44,
    DRAW_SCALE: 1.0,
    WALK_SPEED: 260,
    RUN_SPEED: 370,
    ACCEL: 1700,
    DECEL: 2100,
    AIR_ACCEL: 1300,
    AIR_DECEL: 800,
    GRAVITY: 1450,
    FALL_GRAVITY_MULT: 1.25,
    MAX_FALL_SPEED: 850,
    JUMP_VELOCITY: -580,
    VARIABLE_JUMP_FALL_CUTOFF: 0.42,
    COYOTE_TIME: 0.13,
    JUMP_BUFFER: 0.13,
    MUSHROOM_BOUNCE_VELOCITY: -760
  },
  COLORS: {
    NAVY_DEEP: '#080c1d',
    NAVY_MID: '#101738',
    PURPLE_DEEP: '#251b47',
    PURPLE_VIBRANT: '#5c3894',
    LAVENDER: '#caaefc',
    TEAL: '#32b5a1',
    SOFT_GREEN: '#3f7e61',
    GOLD_WARM: '#ffd15c',
    GOLD_LIGHT: '#fff0a6',
    SECRET_PURPLE: '#d38fff',
    WATER_TEAL: 'rgba(50, 181, 161, 0.65)',
    WATER_GLOW: 'rgba(110, 235, 215, 0.4)'
  },
  ZONES: [
    { id: 'start', name: 'Início da Floresta', startX: 0, endX: 1150 },
    { id: 'mushrooms', name: 'Bosque dos Cogumelos', startX: 1150, endX: 2450 },
    { id: 'bridge', name: 'Ponte Antiga', startX: 2450, endX: 3650 },
    { id: 'stream', name: 'Riacho Encantado', startX: 3650, endX: 4850 },
    { id: 'glade', name: 'Clareira Mística', startX: 4850, endX: 5950 },
    { id: 'tree', name: 'Árvore Ancestral', startX: 5950, endX: 7200 }
  ],
  TOTAL_MAIN_STARS: 20,
  TOTAL_SECRET_STARS: 3,
  SETTINGS_DEFAULT: {
    musicVolume: 0.70,
    sfxVolume: 0.85,
    screenShake: true,
    reduceMotion: false,
    particles: 'high',
    highContrast: false
  }
};

window.CONFIG = CONFIG;
