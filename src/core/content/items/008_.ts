import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'a1fa0017-ccd9-42f2-9877-0f3e679c8e3e',
  isOpen: true,
  sprite: {
    width: 172,
    height: 168,
    src: 'items/8.png'
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