import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import IConsumable from "../base/IConsumable";
import { LocaleText } from "../base/LocaleText";
import { Resource } from "../base/Resource";

/** Класс для карт/рун */
export class ConsumablePassive extends Resource implements IConsumable {

  isOpen: boolean = false;
  sprite: SpriteSource | null = null;
  pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

  getPreview(): Nullable<SpriteSource> {
    return this.sprite;
  }

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;

}