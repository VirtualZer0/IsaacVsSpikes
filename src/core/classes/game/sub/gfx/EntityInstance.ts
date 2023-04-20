import { Entity } from '@/core/classes/base/Entity';
import { EntityType } from '@/core/types/game/EntityType';
import { v4 as uuid, NIL as nilUuid } from 'uuid';

export class EntityInstance {
  id = uuid();
  srcId: string = nilUuid;
  type: EntityType = EntityType.OBJECT;
  position = { x: 0, y: 0 };
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
}
