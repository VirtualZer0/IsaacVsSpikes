import { Item } from "@/core/classes/game/Item";
import itemData from '../data/d11cf9f9-cc69-40a9-97ca-e63fddd43567.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;