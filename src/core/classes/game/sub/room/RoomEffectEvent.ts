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

  type: RoomEventType = RoomEventType.EFFECT;

  sound: Asset | null = null;
  switchScene = '';
  copyFromScene = '';
  removeObjectsWithTags: string[] = [];
}
