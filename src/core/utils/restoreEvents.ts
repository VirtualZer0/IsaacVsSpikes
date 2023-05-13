import { RoomChanceEvent } from '../classes/game/resources/sub/room/RoomChanceEvent';
import { RoomSelectEvent } from '../classes/game/resources/sub/room/RoomSelectEvent';
import { RoomEvent } from '../classes/game/resources/sub/room/RoomEvent';
import { RoomEventType } from '../classes/game/resources/sub/room/RoomEventType';
import { RoomRewardEvent } from '../classes/game/resources/sub/room/RoomRewardEvent';
import { RoomStatsChangeEvent } from '../classes/game/resources/sub/room/RoomStatsChangeEvent';
import { RoomStatsCheckEvent } from '../classes/game/resources/sub/room/RoomStatsCheckEvent';
import { RoomTextEvent } from '../classes/game/resources/sub/room/RoomTextEvent';
import { restoreClass } from './restoreClass';
import { RoomEffectEvent } from '../classes/game/resources/sub/room/RoomEffectEvent';
import { RoomOrEvent } from '../classes/game/resources/sub/room/RoomOrEvent';
import { RoomCounterEvent } from '../classes/game/resources/sub/room/RoomCounterEvent';

/** Восстанавливает типы событий комнат */
export function restoreEvents(
  events: RoomEvent[],
  func = restoreClass
): RoomEvent[] {
  return events.map((event) => {
    switch (event.type) {
      case RoomEventType.TEXT:
        return func<RoomTextEvent>(event, RoomTextEvent);
      case RoomEventType.SELECT:
        return func<RoomSelectEvent>(event, RoomSelectEvent);
      case RoomEventType.STATSCHECK:
        return func<RoomStatsCheckEvent>(event, RoomStatsCheckEvent);
      case RoomEventType.STATSCHANGE:
        return func<RoomStatsChangeEvent>(event, RoomStatsChangeEvent);
      case RoomEventType.REWARD:
        return func<RoomRewardEvent>(event, RoomRewardEvent);
      case RoomEventType.CHANCE:
        return func<RoomChanceEvent>(event, RoomChanceEvent);
      case RoomEventType.EFFECT:
        return func<RoomEffectEvent>(event, RoomEffectEvent);
      case RoomEventType.COUNTER:
        return func<RoomCounterEvent>(event, RoomCounterEvent);
      case RoomEventType.OR:
        return func<RoomOrEvent>(event, RoomOrEvent);
      default:
        return func<RoomEvent>(event, RoomEvent);
    }
  });
}
