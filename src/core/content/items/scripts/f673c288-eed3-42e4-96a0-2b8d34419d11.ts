import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/f673c288-eed3-42e4-96a0-2b8d34419d11.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
