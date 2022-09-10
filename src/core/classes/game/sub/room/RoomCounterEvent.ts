import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from "uuid";
import { RoomEventType } from "./RoomEventType";
import { CounterEventMode } from "@/core/types/game/CounterEventMode";

/** Ивент на изменение параметров игрока */
export class RoomCounterEvent extends RoomEvent {
  label = "";
  mode: CounterEventMode = CounterEventMode.CHECK;
  value = 0;

  outputEvents: { [key: string]: string } = {
    success: nilUUid,
    fail: nilUUid,
  };

  type: RoomEventType = RoomEventType.COUNTER;
}
