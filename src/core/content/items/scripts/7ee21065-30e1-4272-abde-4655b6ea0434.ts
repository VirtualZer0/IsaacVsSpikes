import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/7ee21065-30e1-4272-abde-4655b6ea0434.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
