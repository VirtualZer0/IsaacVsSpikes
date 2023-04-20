import { Item } from '@/core/classes/game/Item';
import itemData from '../data/66cd83da-1fc3-441f-a06d-3ff01f5a812d.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
