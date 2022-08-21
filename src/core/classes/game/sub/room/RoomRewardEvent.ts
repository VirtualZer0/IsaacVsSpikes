import { LocaleText } from "@/core/classes/base/LocaleText";
import { RoomEvent } from "./RoomEvent";
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from "./RoomEventType";
import { ResourceLink } from "@/core/classes/base/ResourceLink";

/** Ивент на выдачу наград */
export class RoomRewardEvent extends RoomEvent {

  /** Следующий ивент */
  outputEvents: { [key: string]: string; } = {
    next: nilUUid,
  };

  type: RoomEventType = RoomEventType.REWARD;

  /** Награда */
  reward: ResourceLink[] = [];

  pickups = {
    coins: 0,
    bombs: 0,
    keys: 0
  };

  goldenKey: boolean = false;
  goldenBomb: boolean = false;

}