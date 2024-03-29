import { LocaleText } from '@/core/classes/base/LocaleText';
import { RoomEvent } from './RoomEvent';
import { NIL as nilUUid } from 'uuid';
import { RoomEventType } from './RoomEventType';
import { CharacterStatsCheckData } from '../character/CharcterStats';
import { ResourceLink } from '@/core/classes/base/ResourceLink';
import { CharacterHearts } from '../character/CharacterHealth';
import { CharacterConsumablesCheckData } from '../character/CharacterConsumables';

/** Ивент на проверку статов персонажа */
export class RoomStatsCheckEvent extends RoomEvent {
  /** Диалог при успешном прохождении ивента */
  successDialog: LocaleText[] = [{}];

  /** Диалог при неудачном прохождении ивента */
  failDialog: LocaleText[] = [{}];

  /** Включить визуализацию проверки */
  showAnim = false;

  /** Требуемый для прохождения предмет */
  requiredItems: ResourceLink[] = [];

  /** Требуемые для прохождения статы */
  requiredStats: CharacterStatsCheckData = new CharacterStatsCheckData();

  /** Требуемые расходники */
  requiredConsumables: CharacterConsumablesCheckData =
    new CharacterConsumablesCheckData();

  /** Требуемые сердца */
  hearts: CharacterHearts = new CharacterHearts();

  /** Требуемые теги */
  tags: string[] = [];

  /** Выходные ивенты при успехе/поражении */
  outputEvents: { [key: string]: string } = {
    success: nilUUid,
    fail: nilUUid,
  };

  type: RoomEventType = RoomEventType.STATSCHECK;
}
