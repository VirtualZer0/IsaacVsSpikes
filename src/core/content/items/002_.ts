import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item =  Object.assign(new Item(), {

  id: 'ee879d1e-b226-4888-87f4-947a173db577',
  isOpen: true,
  sprite: {
    width: 96,
    height: 212,
    src: 'items/2.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.BOSS,

});

export default item;