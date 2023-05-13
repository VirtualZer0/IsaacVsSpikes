import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/c231184c-9259-4e3a-aac9-431e91507487.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
