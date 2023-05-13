import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/0e250f6f-d44c-4d82-a608-71b0e2a1c045.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
