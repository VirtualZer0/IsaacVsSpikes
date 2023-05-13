import { Entity } from '../../base/Entity';
import { EntityType } from '@/core/types/game/EntityType';
import { IStatModifier } from './sub/character/IStatModifier';
import { LootTable } from './sub/LootTable';
import { LocaleText } from '../../base/LocaleText';
import { IEntityObjectData } from './sub/entityObject/IEntityObjectData';

export class EntityObject extends Entity {
  type = EntityType.OBJECT;

  /** Описание объекта */
  desc: LocaleText = {};

  /** Теги объекта */
  tags = ['object'];

  entityData?: IEntityObjectData | IStatModifier | LootTable[];
}
