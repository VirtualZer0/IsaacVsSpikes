import { Game } from "./classes/game/Game";
import { SpriteManager } from "./gfx/SpriteManager";

/** Основной класс игры */
class Core {
  spriteManager: SpriteManager = new SpriteManager();
  game: Game = new Game();
}

const core = new Core();
const game = core.game;
const library = game.library;

export { core, game, library };
