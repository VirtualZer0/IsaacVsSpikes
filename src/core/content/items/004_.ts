import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '00ef8dd7-0790-4362-8630-6576fcc803ee',
  isOpen: true,
  sprite: {
    width: 197,
    height: 178,
    src: 'items/4.png'
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