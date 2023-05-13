import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/a1fa0017-ccd9-42f2-9877-0f3e679c8e3e.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
