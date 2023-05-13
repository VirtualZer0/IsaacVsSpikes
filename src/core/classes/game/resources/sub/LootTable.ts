import { ItemPool } from '@/core/types/game/ItemPool';
import { WeightedResourceLink } from '../../../base/ResourceLink';
import { EntityObject } from '../EntityObject';

export class LootTable {
  weight = 1;
  maxCount = 3;
  rewards: WeightedResourceLink[] = [];
  itemWeight = 0;
  itemPool = ItemPool.DEFAULT;
}
