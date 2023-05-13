import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/00ef8dd7-0790-4362-8630-6576fcc803ee.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
