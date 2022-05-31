import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'a9e78592-c922-49dc-b8dd-bdfdc7e233b6',
  isOpen: true,
  sprite: {
    width: 88,
    height: 218,
    src: 'items/21.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.DEFAULT,

});

export default item;