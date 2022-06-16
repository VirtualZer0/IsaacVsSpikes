import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import IConsumable from "../base/IConsumable";
import { Resource } from "../base/Resource";
import { ResourceFilter } from "../base/ResourceFilter";

/** Класс для монеток/бомб/ключей и их вариаций */
export class ConsumableActive extends Resource implements IConsumable {

  isOpen: boolean = false;
  sprite: SpriteSource | null = null;
  pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

  getFilters(): ResourceFilter[] {
    return [
      {name: 'isOpen', values: ['true', 'false']},
      {name: 'pool', values: Object.values(ConsumablePool).map(v => v.toString())},
    ]
  }

  isMatchFilter(filter: string, value: string): boolean {
    switch (filter) {
      case 'isOpen':
        return this.isOpen.toString() === value;
      case 'pool':
        return this.pool.toString() === value;
      default:
        return super.isMatchFilter(filter, value);
    }
  }

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;
  onUse?: Nullable<() => void> = null;

}