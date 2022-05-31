import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '2b33cddb-604d-4aff-bcef-e0106f76d5dc',
  isOpen: true,
  sprite: {
    width: 170,
    height: 116,
    src: 'items/1.png'
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

  onPickup() {
    console.log('Предмет поднят');
  }

});

export default item;