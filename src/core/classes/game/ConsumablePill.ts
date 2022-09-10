import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import IConsumable from "../base/IConsumable";

/** Класс для пилюлль */
export class ConsumablePill extends Resource implements IConsumable {
  isOpen = false;
  sprite: SpriteSource | null = null;
  pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;
  onActivate?: Nullable<() => void> = null;
}
