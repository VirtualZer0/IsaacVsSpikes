import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/b2947ec1-2ff3-48c0-a6a5-a69d4f46eab7.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
