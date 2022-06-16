import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '09374e4e-e6de-448e-8d87-6845953a04da',
  isOpen: true,
  sprite: {
    width: 192,
    height: 289,
    src: 'items/19.png'
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