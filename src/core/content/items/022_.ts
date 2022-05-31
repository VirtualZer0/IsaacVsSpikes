import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'f673c288-eed3-42e4-96a0-2b8d34419d11',
  isOpen: true,
  sprite: {
    width: 88,
    height: 219,
    src: 'items/22.png'
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