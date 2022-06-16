import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '069e74f0-4190-4ce3-9560-a414fbd1aadc',
  isOpen: true,
  sprite: {
    width: 145,
    height: 204,
    src: 'items/15.png'
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