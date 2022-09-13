import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from "uuid";
import { RoomEventType } from "./RoomEventType";
import { OrChecksMode } from "@/core/types/game/OrChecksMode";

/** Ивент, объединяющий несколько проверок */
export class RoomOrEvent extends RoomEvent {
  variants: string[] = ["out1", "out2"];

  outputEvents: { [key: string]: string } = {
    out1: nilUUid,
    out2: nilUUid,
    fail: nilUUid,
  };

  counterEnabled = false;
  counterLabel = "";
  counterChecksMode: OrChecksMode = OrChecksMode.SUCCESS;

  type: RoomEventType = RoomEventType.OR;
}
