import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '7ee21065-30e1-4272-abde-4655b6ea0434',
  isOpen: true,
  sprite: {
    width: 155,
    height: 207,
    src: 'items/28.png'
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