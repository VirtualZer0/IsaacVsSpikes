import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '9c83b7ff-8a12-4223-ac94-aa946006cbaa',
  isOpen: true,
  sprite: {
    width: 88,
    height: 218,
    src: 'items/24.png'
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