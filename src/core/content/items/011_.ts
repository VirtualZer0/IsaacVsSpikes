import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '3fc4e599-18a4-440e-8d06-50966fbbfca4',
  isOpen: true,
  sprite: {
    width: 107,
    height: 155,
    src: 'items/11.png'
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