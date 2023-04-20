import { LocaleText } from '@/core/classes/base/LocaleText';
import { RoomEvent } from './RoomEvent';
import { RoomEventType } from './RoomEventType';
import { NIL as nilUUid } from 'uuid';
import { CharacterHearts } from '../character/CharacterHealth';
import { CharacterConsumables } from '../character/CharacterConsumables';
import { DamageType } from '@/core/types/game/DamageType';

/** Ивент на отображение диалога с ввыбором */
export class RoomSelectEvent extends RoomEvent {
  variants: RoomSelectEventVariant[] = [new RoomSelectEventVariant()];

  outputEvents: { [key: string]: string } = {
    out1: nilUUid,
  };

  type: RoomEventType = RoomEventType.SELECT;
}

export class RoomSelectEventVariant {
  text: LocaleText = {};
  key = 'out1';
  showFuture = false;
  requirment = {
    enabled: false,
    hearts: new CharacterHearts(),
    consumables: new CharacterConsumables(),
    damageEnabled: false,
    damage: 0,
    damageType: DamageType.DEFAULT,
    damageTags: [],
  };
}
