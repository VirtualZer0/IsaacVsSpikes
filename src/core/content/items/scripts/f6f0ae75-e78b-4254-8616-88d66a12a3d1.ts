import { Item } from '@/core/classes/game/Item';
import itemData from '../data/f6f0ae75-e78b-4254-8616-88d66a12a3d1.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
