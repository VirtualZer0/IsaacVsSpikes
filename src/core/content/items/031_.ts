import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: 'f6f0ae75-e78b-4254-8616-88d66a12a3d1',
  isOpen: true,
  sprite: {
    width: 129,
    height: 126,
    src: 'items/31.png'
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