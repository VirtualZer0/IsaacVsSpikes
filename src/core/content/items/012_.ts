import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'd11cf9f9-cc69-40a9-97ca-e63fddd43567',
  isOpen: true,
  sprite: {
    width: 140,
    height: 192,
    src: 'items/12.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.SHOP,

});

export default item;