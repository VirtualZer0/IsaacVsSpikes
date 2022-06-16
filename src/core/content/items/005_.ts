import { Item } from "@/core/classes/game/Item";
import { ItemPool } from "@/core/types/game/ItemPool";
const item: Item = Object.assign(new Item(), {

  id: '10b8386b-0d9a-430f-bc23-60c83a2adb06',
  isOpen: true,
  sprite: {
    width: 101,
    height: 105,
    src: 'items/5.png'
  },

  name: {
    ru: 'Какой-то предмет',
    en: ''
  },

  desc: {
    ru: 'Какое-то описание',
    en: ''
  },

  pool: 'boss',

});

export default item;