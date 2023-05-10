import { createStatModifier, IStatModifier } from '../character/IStatModifier';

export class ItemEffect {
  roomTags: string[] = [];
  playerTags: string[] = [];
  statModifier: IStatModifier = createStatModifier({
    damage: true,
    removedTags: true,
    removeHealth: true,
  });
}
