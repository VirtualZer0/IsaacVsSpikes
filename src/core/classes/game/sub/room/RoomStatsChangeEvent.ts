import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from "uuid";
import { RoomEventType } from "./RoomEventType";
import { CharacterStats } from "../character/CharcterStats";
import { CharacterHearts } from "../character/CharacterHealth";
import { DamageType } from "@/core/types/game/DamageType";
import { CharacterConsumables } from "../character/CharacterConsumables";

/** Ивент на изменение параметров игрока */
export class RoomStatsChangeEvent extends RoomEvent {
  /** Статы игрока */
  stats: CharacterStats = new CharacterStats();
  /** Расходники игрока */
  consumables: CharacterConsumables = new CharacterConsumables();

  /** Здоровье игрока */
  addHealth: CharacterHearts = new CharacterHearts();
  removeHealth: CharacterHearts = new CharacterHearts();

  /** Нанесение урона */
  damageEnabled = false;
  damage = 0;
  damageType: DamageType = DamageType.DEFAULT;
  damageTags: string[] = [];

  /** Теги для добавления */
  addedTags: string[] = [];

  /** Теги для удаления */
  removedTags: string[] = [];

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.STATSCHANGE;
}
