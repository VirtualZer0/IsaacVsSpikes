import { Resource } from '@/core/classes/base/Resource';
import { EntityInstance } from '../gfx/EntityInstance';
import { v4 as uuid } from 'uuid';

export class RoomScene extends Resource {
  entities: EntityInstance[] = [];

  constructor() {
    super();
    this.id = uuid();
    this.name = { en: 'default' };
  }
}
