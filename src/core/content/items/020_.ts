import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '172acacb-ced3-4a5a-8f26-5b141cfbec11',
  isOpen: true,
  sprite: {
    width: 176,
    height: 250,
    src: 'items/20.png'
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