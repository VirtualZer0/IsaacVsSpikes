import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'f266ca32-8c9b-4ba2-9dc3-86da0ba0b4a6',
  isOpen: true,
  sprite: {
    width: 168,
    height: 221,
    src: 'items/26.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.DEFAULT,

});

export default item;