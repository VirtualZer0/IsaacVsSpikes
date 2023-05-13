import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { Resource } from '../../base/Resource';
import { LocaleText } from '../../base/LocaleText';
import { RoomEvent } from './sub/room/RoomEvent';
import { ResourceLink, WeightedResourceLink } from '../../base/ResourceLink';
import { RoomType } from '../../../types/game/RoomType';
import { RoomScene } from './sub/room/RoomScene';

export class Room extends Resource {
  /** Шанс появления комнаты */
  weight = 1;

  /** Описание комнаты */
  desc: LocaleText[] = [{}];

  /** Тип комнаты */
  type: RoomType = RoomType.NORMAL;

  /** Шанс дропа после прохождения */
  dropChance = 0.5;

  /** Описания двери */
  doorDescs: WeightedResourceLink[] = [];

  /** Спрайт комнаты, если не определен - используется спрайт уровня */
  background: SpriteSource[] = [];

  /** Оверлей комнаты, если не определен - используется оверлей уровня */
  overlay: SpriteSource[] = [];

  /** Привязанный уровень */
  level: ResourceLink | null = null;

  /** Сцены комнаты */
  scenes: RoomScene[] = [new RoomScene()];

  /** События в комнате */
  events: RoomEvent[] = [];
}
