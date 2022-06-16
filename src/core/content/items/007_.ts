import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'b2947ec1-2ff3-48c0-a6a5-a69d4f46eab7',
  isOpen: true,
  sprite: {
    width: 209,
    height: 218,
    src: 'items/7.png'
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