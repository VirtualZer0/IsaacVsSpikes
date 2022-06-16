import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'c231184c-9259-4e3a-aac9-431e91507487',
  isOpen: true,
  sprite: {
    width: 193,
    height: 252,
    src: 'items/25.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: 'default',

});

export default item;