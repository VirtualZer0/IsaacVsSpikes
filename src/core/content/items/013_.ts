import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'cb20114d-4bcd-42cd-ad5b-ab25d0918168',
  isOpen: true,
  sprite: {
    width: 189,
    height: 183,
    src: 'items/13.png'
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