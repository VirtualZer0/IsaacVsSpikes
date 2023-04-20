import { Item } from '@/core/classes/game/Item';
import itemData from '../data/623198c5-9ff8-4927-b01f-3a7bcf1d82b3.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
