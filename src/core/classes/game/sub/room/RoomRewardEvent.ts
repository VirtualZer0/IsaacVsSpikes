import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from "./RoomEventType";

/** Ивент на выдачу наград */
export class RoomRewardEvent extends RoomEvent {

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string; } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.REWARD;

}