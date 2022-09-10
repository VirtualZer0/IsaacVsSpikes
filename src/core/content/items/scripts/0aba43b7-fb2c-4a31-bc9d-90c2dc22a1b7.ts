import { Item } from "@/core/classes/game/Item";
import itemData from "../data/0aba43b7-fb2c-4a31-bc9d-90c2dc22a1b7.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
