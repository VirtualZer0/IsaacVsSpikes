import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from "uuid";
import { RoomEventType } from "./RoomEventType";

/** Ивент простого отображения текста */
export class RoomTextEvent extends RoomEvent {
  /** Выходные ивенты */
  outputEvents: { [key: string]: string } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.TEXT;
}
