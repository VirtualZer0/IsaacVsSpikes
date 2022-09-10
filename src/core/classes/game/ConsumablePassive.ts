import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import IConsumable from "../base/IConsumable";
import { LocaleText } from "../base/LocaleText";
import { Resource } from "../base/Resource";

/** Класс для карт/рун */
export class ConsumablePassive extends Resource implements IConsumable {
  isOpen = false;
  sprite: SpriteSource | null = null;
  pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;
}
