import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { RoomEventType } from "./RoomEventType";

/** Ивент на отображение диалога с ввыбором */
export class RoomDialogEvent extends RoomEvent {
  variants: {text: LocaleText, event: string, key: string}[] = [];
  type: RoomEventType = RoomEventType.DIALOG;
}