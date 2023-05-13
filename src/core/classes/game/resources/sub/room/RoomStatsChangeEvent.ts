import { RoomEvent } from './RoomEvent';
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from './RoomEventType';
import { CharacterStats } from '../character/CharcterStats';
import { CharacterHearts } from '../character/CharacterHealth';
import { DamageType } from '@/core/types/game/DamageType';
import { CharacterConsumables } from '../character/CharacterConsumables';
import { IStatModifier } from '../character/IStatModifier';

/** Ивент на изменение параметров игрока */
export class RoomStatsChangeEvent extends RoomEvent implements IStatModifier {
  stats = new CharacterStats();
  consumables = new CharacterConsumables();

  addHealth = new CharacterHearts();
  removeHealth = new CharacterHearts();

  damageEnabled = false;
  damage = 0;
  damageType = DamageType.DEFAULT;
  damageTags = [];

  addedTags = [];
  removedTags = [];

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.STATSCHANGE;
}
