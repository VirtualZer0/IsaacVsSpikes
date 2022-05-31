import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '8dab942f-c0a7-4735-94fd-e1473bbaa18e',
  isOpen: true,
  sprite: {
    width: 142,
    height: 138,
    src: 'items/9.png'
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