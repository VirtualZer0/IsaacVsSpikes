import { Item } from "@/core/classes/game/Item";
import itemData from "../data/2b33cddb-604d-4aff-bcef-e0106f76d5dc.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
