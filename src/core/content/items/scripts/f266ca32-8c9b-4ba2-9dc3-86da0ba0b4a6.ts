import { Item } from "@/core/classes/game/Item";
import itemData from '../data/f266ca32-8c9b-4ba2-9dc3-86da0ba0b4a6.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;