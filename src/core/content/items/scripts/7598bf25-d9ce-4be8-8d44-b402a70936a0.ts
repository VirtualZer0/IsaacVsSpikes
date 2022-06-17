import { Item } from "@/core/classes/game/Item";
import itemData from '../data/7598bf25-d9ce-4be8-8d44-b402a70936a0.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;