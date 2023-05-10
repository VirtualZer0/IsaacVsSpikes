import { DamageType } from '@/core/types/game/DamageType';
import { CharacterConsumables } from './CharacterConsumables';
import { CharacterHearts } from './CharacterHealth';
import { CharacterStats } from './CharcterStats';

export interface IStatModifier {
  /** Статы игрока */
  stats: CharacterStats;
  /** Расходники игрока */
  consumables: CharacterConsumables;

  /** Здоровье игрока */
  addHealth: CharacterHearts;
  removeHealth?: CharacterHearts;

  /** Нанесение урона */
  damageEnabled?: boolean;
  damage?: number;
  damageType?: DamageType;
  damageTags?: string[];

  /** Теги для добавления */
  addedTags: string[];

  /** Теги для удаления */
  removedTags?: string[];
}

export function createStatModifier(
  parts = { damage: false, removeHealth: false, removedTags: false }
) {
  const statModifier = {
    stats: new CharacterStats(),
    consumables: new CharacterConsumables(),
    addHealth: new CharacterHearts(),
    addedTags: [],
  };

  return {
    ...statModifier,

    ...(parts.damage
      ? {
          damageEnabled: false,
          damage: 0,
          damageType: DamageType.DEFAULT,
          damageTags: [],
        }
      : undefined),

    ...(parts.removeHealth
      ? { removeHealth: new CharacterHearts() }
      : undefined),

    ...(parts.removedTags ? { removedTags: [] } : undefined),
  };
}
