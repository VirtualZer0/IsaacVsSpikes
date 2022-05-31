import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '623198c5-9ff8-4927-b01f-3a7bcf1d82b3',
  isOpen: true,
  sprite: {
    width: 66,
    height: 243,
    src: 'items/17.png'
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