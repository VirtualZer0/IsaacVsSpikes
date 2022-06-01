import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { RoomEventType } from "./RoomEventType";
import { NIL as nilUUid } from 'uuid'

/** Ивент на отображение диалога с ввыбором */
export class RoomSelectEvent extends RoomEvent {
  variants: {text: LocaleText, key: string}[] = [
    {text: {}, key: 'out1'},
  ];

  outputEvents: { [key: string]: string; } = {
    out1: nilUUid,
  };

  type: RoomEventType = RoomEventType.SELECT;
}