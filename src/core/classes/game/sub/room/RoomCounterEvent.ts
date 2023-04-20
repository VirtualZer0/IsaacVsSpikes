import { RoomEvent } from './RoomEvent';
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from './RoomEventType';
import { CounterEventMode } from '@/core/types/game/CounterEventMode';
import { CounterEventCheck } from '@/core/types/game/CounterEventCheck';

export enum CounterEventScope {
  LOCAL = 'local',
  SESSION = 'session',
  GLOBAL = 'global',
}

/** Ивент на изменение счетчика */
export class RoomCounterEvent extends RoomEvent {
  label = '';
  scope: CounterEventScope = CounterEventScope.LOCAL;
  mode: CounterEventMode = CounterEventMode.CHECK;
  checkMode: CounterEventCheck = CounterEventCheck.EQUAL;
  value = 0;

  outputEvents: { [key: string]: string } = {
    success: nilUUid,
    fail: nilUUid,
  };

  type: RoomEventType = RoomEventType.COUNTER;
}
