import { ItemPool } from "@/core/types/game/ItemPool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";

export class Item extends Resource {
  /** Открыт-ли предмет */
  isOpen = false;

  /** Спрайт предмета */
  sprite: SpriteSource | null = null;

  /** Описание предмета */
  desc: LocaleText = {};

  /** Приоритет предмета */
  priority = 0;

  /** Пересчитывать статы */
  recalculateStats = false;

  /** Пул предмета */
  pool: ItemPool = ItemPool.DEFAULT;

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;

  override getPreview(): Promise<string> {
    if (this.sprite && "src" in this.sprite) {
      return Promise.resolve(
        `<img lazy src="/assets/${(this.sprite as SpriteSource).src}"/>`
      );
    } else return super.getPreview();
  }
}
