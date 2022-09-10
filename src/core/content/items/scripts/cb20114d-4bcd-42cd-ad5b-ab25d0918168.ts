import { Item } from "@/core/classes/game/Item";
import itemData from "../data/cb20114d-4bcd-42cd-ad5b-ab25d0918168.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
