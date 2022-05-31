import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '0aba43b7-fb2c-4a31-bc9d-90c2dc22a1b7',
  isOpen: true,
  sprite: {
    width: 163,
    height: 163,
    src: 'items/3.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.BOSS,

});

export default item;