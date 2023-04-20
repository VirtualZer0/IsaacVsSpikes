import { Item } from '@/core/classes/game/Item';
import itemData from '../data/3fc4e599-18a4-440e-8d06-50966fbbfca4.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
