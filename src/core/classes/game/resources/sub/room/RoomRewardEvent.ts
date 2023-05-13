import { RoomEvent } from './RoomEvent';
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from './RoomEventType';
import { ResourceLink } from '@/core/classes/base/ResourceLink';
import { ItemPool } from '@/core/types/game/ItemPool';

/** Ивент на выдачу наград */
export class RoomRewardEvent extends RoomEvent {
  /** Следующий ивент */
  outputEvents: { [key: string]: string } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.REWARD;

  /** Спавнить вместо прямой выдачи */
  spawn = true;

  /** Награда */
  reward: ResourceLink[] = [];

  giveFromPool = false;
  pool: ItemPool = ItemPool.DEFAULT;

  pickups = {
    coins: 0,
    bombs: 0,
    keys: 0,
  };

  goldenKey = false;
  goldenBomb = false;
}
