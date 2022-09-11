import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from "uuid";
import { RoomEventType } from "./RoomEventType";
import { CounterEventMode } from "@/core/types/game/CounterEventMode";
import { CounterEventCheck } from "@/core/types/game/CounterEventCheck";

/** Ивент на изменение параметров игрока */
export class RoomCounterEvent extends RoomEvent {
  label = "";
  mode: CounterEventMode = CounterEventMode.CHECK;
  checkMode: CounterEventCheck = CounterEventCheck.EQUAL;
  value = 0;

  outputEvents: { [key: string]: string } = {
    success: nilUUid,
    fail: nilUUid,
  };

  type: RoomEventType = RoomEventType.COUNTER;
}
