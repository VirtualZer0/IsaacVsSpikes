import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from 'uuid'
import { RoomEventType } from "./RoomEventType";

/** Ивент, выбирающий случайный исход из доступных */
export class RoomChanceEvent extends RoomEvent {
  variants: { key: string; weight: number }[] = [
    { key: 'out1', weight: 1 },
  ];

  outputEvents: { [key: string]: string; } = {
    out1: nilUUid,
  };

  type: RoomEventType = RoomEventType.CHANCE;
}