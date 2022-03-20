import { ItemPool } from "@/core/types/game/ItemPool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { LocaleText } from "../base/LocaleText";

export class Item {

  /** Id предмета */
  id: number = 0;

  /** Открыт-ли предмет */
  isOpen: boolean = false;

  /** Спрайт предмета */
  sprite: SpriteSource | null = null;

  /** Название предмета */
  name: LocaleText = null;

  /** Описание предмета */
  desc: LocaleText = null;

  /** Пул предмета */
  pool: ItemPool = ItemPool.DEFAULT;

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;
}