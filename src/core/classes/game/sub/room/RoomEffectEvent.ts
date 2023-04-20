import { RoomEvent } from './RoomEvent';
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from './RoomEventType';
import { Asset } from '../../Asset';

/** Ивент простого отображения текста */
export class RoomEffectEvent extends RoomEvent {
  /** Выходные ивенты */
  outputEvents: { [key: string]: string } = {
    next: nilUUid,
  };

  sound: Asset | null = null;

  type: RoomEventType = RoomEventType.EFFECT;
}
