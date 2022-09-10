import { Item } from "@/core/classes/game/Item";
import itemData from "../data/868a7bd2-2751-473d-ba45-b807bebb758f.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
