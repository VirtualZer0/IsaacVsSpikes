import { MusicManager } from './classes/env/sfx/MusicManager';
import { Game } from './classes/game/Game';
import { SpriteManager } from './gfx/SpriteManager';

/** Основной класс игры */
class Core {
  spriteManager: SpriteManager = new SpriteManager();
  musicManager: MusicManager = new MusicManager('fd');
  game: Game = new Game();

  constructor() {
    this.spriteManager.start();
  }
}

const core = new Core();
const game = core.game;
const library = game.library;

export { core, game, library };
