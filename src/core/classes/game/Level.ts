import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { Room } from "./Room";
import { Asset } from "./Asset";

export class Level extends Resource {

  /** Описание уровня */
  desc: LocaleText = {};

  /** Спрайт уровня */
  sprite: Asset | null = null;

  /** Оверлей уровня */
  overlay: Asset | null = null;

  /** Объект с комнатами */
  rooms: Room[] = [];

  /** Количество подуровней */
  sublevels: number = 2;

  /** Минимальное количество комнат в подуровне */
  minRooms: number = 4;

  /** Максимальное количество комнат в подуровне */
  maxRooms: number = 8;

  getPreview(): Nullable<SpriteSource> {
    return null;
  }
}