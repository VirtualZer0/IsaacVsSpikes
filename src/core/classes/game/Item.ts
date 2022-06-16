import { ItemPool } from "@/core/types/game/ItemPool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";

export class Item extends Resource {

  /** Открыт-ли предмет */
  isOpen: boolean = false;

  /** Спрайт предмета */
  sprite: SpriteSource | null = null;

  /** Описание предмета */
  desc: LocaleText = {};

  /** Пул предмета */
  pool: ItemPool = ItemPool.DEFAULT;

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;
}