import { Entity } from '@/core/classes/base/Entity';
import { EntityType } from '@/core/types/game/EntityType';
import { v4 as uuid } from 'uuid';

export class EntityInstance {
  id = uuid();
  srcId = '';
  type: EntityType = EntityType.OBJECT;
  x = 0;
  y = 0;
  rotation = 0;
  width = 64;
  height = 64;
  layer = 10000;
  animation = 'idle';
  saveAspectRatio = true;

  setSource(entity: Entity) {
    this.srcId = entity.id;
    this.type = entity.type;
  }

  static create(entity: Entity): EntityInstance {
    const instance = new EntityInstance();
    instance.setSource(entity);
    return instance;
  }
}
