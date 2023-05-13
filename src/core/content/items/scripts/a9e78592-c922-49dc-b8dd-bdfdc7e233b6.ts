import { Item } from '@/core/classes/game/resources/Item';
import itemData from '../data/a9e78592-c922-49dc-b8dd-bdfdc7e233b6.json';

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
