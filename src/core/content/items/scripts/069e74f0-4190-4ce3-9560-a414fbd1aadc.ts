import { Item } from '@/core/classes/game/Item';
import itemData from '../data/069e74f0-4190-4ce3-9560-a414fbd1aadc.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
