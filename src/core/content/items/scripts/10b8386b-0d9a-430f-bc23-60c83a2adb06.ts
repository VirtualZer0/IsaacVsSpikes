import { Item } from "@/core/classes/game/Item";
import itemData from "../data/10b8386b-0d9a-430f-bc23-60c83a2adb06.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
