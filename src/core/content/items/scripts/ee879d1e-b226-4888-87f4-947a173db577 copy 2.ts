import { Item } from "@/core/classes/game/Item";
import itemData from '../data/ee879d1e-b226-4888-87f4-947a173db577.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;