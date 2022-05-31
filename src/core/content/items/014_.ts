import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '5fc12fcf-20a1-442d-ac0f-504d1a05bdee',
  isOpen: true,
  sprite: {
    width: 123,
    height: 228,
    src: 'items/14.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: ItemPool.SHOP,

});

export default item;