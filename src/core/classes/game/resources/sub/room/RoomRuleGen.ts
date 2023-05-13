import { LevelDoorSlot } from '../level/LevelDoorSlot';
import { RoomType } from '../../../../../types/game/RoomType';

/** Правило генерации комнаты */
export type RoomRuleGen = {
  /** Генерация включена */
  enabled: boolean;

  /** Тип комнаты */
  type: RoomType;

  /** Генерировать после указанных комнат. Если массив пустой - отсчет со старта */
  genAfter: RoomType[];

  /** Расстояние между последней указанной комнатой */
  spaceBetween: number;

  /** Разрешенные для генерации слоты */
  slots: LevelDoorSlot[];

  /** Генерация комнаты обязательна, даже если не найдено подходящее место */
  required: boolean;
};
