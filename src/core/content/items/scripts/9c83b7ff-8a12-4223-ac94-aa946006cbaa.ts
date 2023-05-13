import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/9c83b7ff-8a12-4223-ac94-aa946006cbaa.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
