import { RoomChanceEvent } from "../classes/game/sub/room/RoomChanceEvent";
import { RoomDialogEvent } from "../classes/game/sub/room/RoomDialogEvent";
import { RoomEvent } from "../classes/game/sub/room/RoomEvent";
import { RoomEventType } from "../classes/game/sub/room/RoomEventType";
import { RoomRewardEvent } from "../classes/game/sub/room/RoomRewardEvent";
import { RoomStatsChangeEvent } from "../classes/game/sub/room/RoomStatsChangeEvent";
import { RoomStatsCheckEvent } from "../classes/game/sub/room/RoomStatsCheckEvent";
import { RoomTextEvent } from "../classes/game/sub/room/RoomTextEvent";
import { restoreClass } from "./restoreClass";

export function restoreEvents (events: RoomEvent[]): RoomEvent[] {
  return events.map(event => {
    switch (event.type) {
      case RoomEventType.TEXT: return restoreClass<RoomTextEvent>(event, RoomTextEvent);
      case RoomEventType.DIALOG: return restoreClass<RoomDialogEvent>(event, RoomDialogEvent);
      case RoomEventType.STATSCHECK: return restoreClass<RoomStatsCheckEvent>(event, RoomStatsCheckEvent);
      case RoomEventType.STATSCHANGE: return restoreClass<RoomStatsChangeEvent>(event, RoomStatsChangeEvent);
      case RoomEventType.REWARD: return restoreClass<RoomRewardEvent>(event, RoomRewardEvent);
      case RoomEventType.CHANCE: return restoreClass<RoomChanceEvent>(event, RoomChanceEvent);
      default: return restoreClass<RoomEvent>(event, RoomEvent);
    }
  });
}