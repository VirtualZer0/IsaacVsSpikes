import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '7598bf25-d9ce-4be8-8d44-b402a70936a0',
  isOpen: true,
  sprite: {
    width: 95,
    height: 209,
    src: 'items/18.png'
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