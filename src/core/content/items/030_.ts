import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '47425081-e5a9-489a-8b48-38c8eed9c9d9',
  isOpen: true,
  sprite: {
    width: 177,
    height: 219,
    src: 'items/30.png'
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