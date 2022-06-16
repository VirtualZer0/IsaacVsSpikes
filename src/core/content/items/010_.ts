import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '868a7bd2-2751-473d-ba45-b807bebb758f',
  isOpen: true,
  sprite: {
    width: 120,
    height: 253,
    src: 'items/10.png'
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