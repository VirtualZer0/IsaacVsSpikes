import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from "./RoomEventType";
import { CharacterStats } from "../character/CharcterStats";

/** Ивент на изменение параметров игрока */
export class RoomStatsChangeEvent extends RoomEvent {

  /** Статы игрока */
  stats: CharacterStats = new CharacterStats();

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string; } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.STATSCHANGE;

}