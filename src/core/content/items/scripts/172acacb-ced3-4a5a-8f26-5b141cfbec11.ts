import { Item } from "@/core/classes/game/Item";
import itemData from "../data/172acacb-ced3-4a5a-8f26-5b141cfbec11.json";

const item: Item = Object.assign(new Item(), {
  ...itemData,
});

export default item;
