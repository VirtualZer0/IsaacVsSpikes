import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '0c9e0df7-fa29-4003-add1-6f77c811e1cf',
  isOpen: true,
  sprite: {
    width: 260,
    height: 107,
    src: 'items/16.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: 'shop',

});

export default item;