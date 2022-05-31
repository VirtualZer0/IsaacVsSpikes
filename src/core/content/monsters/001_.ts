import { Monster } from "@/core/classes/game/Monster";

const monster: Monster = Object.assign(new Monster(), {

  id: '53c7cbb5-9956-4a76-a605-2f99823653b3',
  isOpen: true,
  name: {
    ru: 'Монстр',
    en: 'Monster'
  },

  desc: {
    ru: 'Описание монстра',
    en: 'Description of monster'
  },

  sprite: {
    width: 193,
    height: 252,
    src: 'items/25.png'
  },

  effects: []
});

export default monster;