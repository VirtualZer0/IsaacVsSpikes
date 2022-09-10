import { Item } from "@/core/classes/game/Item";
import itemData from "../data/8dab942f-c0a7-4735-94fd-e1473bbaa18e.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
