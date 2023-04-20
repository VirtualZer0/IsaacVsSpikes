import { LocaleText } from '@/core/classes/base/LocaleText';
import { Resource } from '@/core/classes/base/Resource';
import { RoomEventType } from './RoomEventType';

import i18n from '@/i18n';

const { t } = i18n.global;

export class RoomEvent extends Resource {
  /** Диалог при начале ивента */
  startDialog: LocaleText[] = [{}];

  /** Входящие ивенты */
  inputEvents: { id: string; key: string }[] = [];

  /** Исходящие ивенты */
  outputEvents: { [key: string]: string } = {};

  /** Тип ивента */
  type: RoomEventType = RoomEventType.BASE;

  /** Координаты ноды */
  pos: { x: number; y: number } = { x: 100, y: 100 };

  override getDisplayName(locale?: string): string {
    if (locale && this.name[locale]) {
      return this.name[locale];
    } else if (Object.values(this.name).length > 0) {
      return Object.values(this.name)[0];
    } else {
      return t(`editor.${this.type}Event`);
    }
  }
}
