import { Item } from "@/core/classes/game/Item";
import itemData from '../data/09374e4e-e6de-448e-8d87-6845953a04da.json';

const item: Item = Object.assign(new Item(), {
  ...itemData
});

export default item;