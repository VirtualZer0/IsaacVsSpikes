import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from 'uuid'
import { RoomEventType } from "./RoomEventType";
import { NumRange } from "@/core/classes/base/NumRange";
import { CharacterStatsCheckData } from "../character/CharcterStats";

/** Ивент на проверку статов персонажа */
export class RoomStatsCheckEvent extends RoomEvent {

  /** Диалог при успешном прохождении ивента */
  successDialog: LocaleText[] = [{}];

  /** Диалог при неудачном прохождении ивента */
  failDialog: LocaleText[] = [{}];

  /** Требуемые для прохождения статы */
  requiredStats: CharacterStatsCheckData = new CharacterStatsCheckData();

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string; } = {
    success: nilUUid,
    fail: nilUUid,
  };

  type: RoomEventType = RoomEventType.STATSCHECK;

}