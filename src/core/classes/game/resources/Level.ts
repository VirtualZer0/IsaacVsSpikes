import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { Resource } from '../../base/Resource';
import { LocaleText } from '../../base/LocaleText';
import { LevelGenSystemType } from './sub/level/LevelGenSystemType';
import { RoomRuleGen } from './sub/room/RoomRuleGen';
import { ResourceLink } from '../../base/ResourceLink';
import { RoomType } from '../../../types/game/RoomType';
import { LootTable } from './sub/LootTable';

export class Level extends Resource {
  /** Описание уровня */
  desc: LocaleText = {};

  /** Является ли уровень обычным (встроенным в стандартную цепочку уровней) */
  regular = true;

  /** Вес уровня, применяется если уровень обычный */
  regularWeight = 1;

  /** Слот уровня при обычной генерации */
  regularSlot = 0;

  /** Спрайты уровня */
  sprites: { [key: string]: SpriteSource[] } = {};

  /** Оверлеи уровня */
  overlays: { [key: string]: SpriteSource[] } = {};

  /** Музыка уровня - начало */
  musicStart: ResourceLink | null = null;

  /** Музыка уровня - цикл */
  musicLoop: ResourceLink | null = null;

  /** Система генерации */
  genSystem: LevelGenSystemType = LevelGenSystemType.INCREMENTAL;

  /** Количество подуровней */
  sublevels = 2;

  /** Минимальное количество комнат в подуровне */
  minRooms = 4;

  /** Максимальное количество комнат в подуровне */
  maxRooms = 8;

  /** Увеличение количества комнат при инкриментальной системе */
  incrementCount = 1;

  /** Правила генерации комнат */
  roomRules: RoomRuleGen[] = [];

  /** Таблица дропа после зачистки комнаты */
  lootTable: LootTable[] = [];

  constructor() {
    super();

    Object.values(RoomType).forEach((type) => {
      this.sprites[type] = [];
      this.overlays[type] = [];
    });
  }
}
