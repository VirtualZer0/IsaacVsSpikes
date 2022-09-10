import { Item } from "@/core/classes/game/Item";
import itemData from "../data/32cd4ae1-3492-4f40-98ae-ad6b7dec014f.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
