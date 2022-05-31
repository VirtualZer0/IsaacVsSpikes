import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { Monster } from "./Monster";
import { RoomDrop } from "./sub/room/RoomDrop";
import { RoomEvent } from "./sub/room/RoomEvent";

export class Room extends Resource {
  /** Шанс появления комнаты */
  weight: number = 1;

  /** Описание комнаты */
  desc: LocaleText[] = [{}];

  /** Описание двери */
  doorDesc: LocaleText = {};

  /** Спрайт комнаты, если не определен - используется спрайт уровня */
  background: Nullable<SpriteSource> = null;

  /** Оверлей комнаты, если не определен - используется оверлей уровня */
  overlay: Nullable<SpriteSource> = null;

  /** Монстры в комнате */
  monsters: Monster[] = [];

  /** События в комнате */
  events: RoomEvent[] = [];

  getPreview(): Nullable<SpriteSource> {
    return this.background;
  }
}