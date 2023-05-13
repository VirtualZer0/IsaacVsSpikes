import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/0c9e0df7-fa29-4003-add1-6f77c811e1cf.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
