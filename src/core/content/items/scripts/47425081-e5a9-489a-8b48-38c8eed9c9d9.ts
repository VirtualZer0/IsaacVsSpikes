import { Item } from "@/core/classes/game/Item";
import itemData from '../data/47425081-e5a9-489a-8b48-38c8eed9c9d9.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;