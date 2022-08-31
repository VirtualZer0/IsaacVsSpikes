import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { Monster } from "./Monster";
import { RoomDrop } from "./sub/room/RoomDrop";
import { RoomEvent } from "./sub/room/RoomEvent";
import { ResourceLink, WeightedResourceLink } from "../base/ResourceLink";
import { RoomType } from "./sub/room/RoomType";

export class Room extends Resource {
  /** Шанс появления комнаты */
  weight: number = 1;

  /** Описание комнаты */
  desc: LocaleText[] = [{}];

  /** Тип комнаты */
  type: RoomType = RoomType.NORMAL;

  /** Описания двери */
  doorDescs: WeightedResourceLink[] = [];

  /** Спрайт комнаты, если не определен - используется спрайт уровня */
  background: SpriteSource[] = [];

  /** Оверлей комнаты, если не определен - используется оверлей уровня */
  overlay: SpriteSource[] = [];

  /** Привязанный уровень */
  level: ResourceLink | null = null;

  /** Монстры в комнате */
  monsters: Monster[] = [];

  /** События в комнате */
  events: RoomEvent[] = [];
}