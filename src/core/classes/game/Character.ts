import { Resource } from '../base/Resource';
import { CharacterHealthController } from './sub/character/CharacterHealthController';
import { CharacterStats } from './sub/character/CharcterStats';

export class Character extends Resource {
  stats: CharacterStats = new CharacterStats();
  health: CharacterHealthController = new CharacterHealthController(this);
  rules = {
    allowRedHearts: true,
    replaceBlueToBlack: false,
  };
}
