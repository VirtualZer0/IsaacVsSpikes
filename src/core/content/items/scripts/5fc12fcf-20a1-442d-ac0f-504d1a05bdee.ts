import { Item } from "@/core/classes/game/Item";
import itemData from "../data/5fc12fcf-20a1-442d-ac0f-504d1a05bdee.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
