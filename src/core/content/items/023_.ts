import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '807ee685-6e4b-4866-8ef4-31a4126f89af',
  isOpen: true,
  sprite: {
    width: 93,
    height: 219,
    src: 'items/23.png'
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