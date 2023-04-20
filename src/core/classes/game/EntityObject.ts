import { Entity } from '../base/Entity';
import { EntityType } from '@/core/types/game/EntityType';
import { IStatModifier } from './sub/character/IStatModifier';
import { LootTable } from './LootTable';
import { LocaleText } from '../base/LocaleText';

export class EntityObject extends Entity {
  type = EntityType.OBJECT;

  /** Описание объекта */
  desc: LocaleText = {};

  entityData?: IStatModifier | LootTable[];
}
