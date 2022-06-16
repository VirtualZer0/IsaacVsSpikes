import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '32cd4ae1-3492-4f40-98ae-ad6b7dec014f',
  isOpen: true,
  sprite: {
    width: 173,
    height: 109,
    src: 'items/6.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: 'boss',

});

export default item;