import { Item } from "@/core/classes/game/Item";
import itemData from "../data/807ee685-6e4b-4866-8ef4-31a4126f89af.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
