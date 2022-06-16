import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { LocaleText } from "./LocaleText";
import { ResourceFilter } from "./ResourceFilter";

import { useMainStore } from "@/store/main";
import {NIL as nilUUid} from 'uuid'

/** Базовый класс ресурса */
export class Resource {
  /** UUID ресурса */
  id: string = nilUUid;
  /** Имя ресурса */
  name: LocaleText = {};

  /** Теги ресурса */
  tags: string[] = [];

  /** Получить превью ресурса */
  async getPreview(): Promise<string> {
    return '';
  }

  /** Получить отображаемое имя ресурса */
  getDisplayName(locale = 'ru'): string {
    if(this.name[locale]) {
      return this.name[locale];
    }
    else if (Object.values(this.name).length > 0) {
      return Object.values(this.name)[0];
    }
    else {
      return 'No name';
    }
  }

  /** Проверить, соответствует ли ресурс поисковой строке */
  isMatch(search: string): boolean {
    const names = Object.values(this.name);
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }

    for (let i = 0; i < this.tags.length; i++) {
      const tag = this.tags[i];
      if (tag.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }

    if (this.id.includes(search.toLowerCase())) {
      return true;
    }

    return false;
  }

  /** Получить доступные фильтры */
  getFilters(): ResourceFilter[] {
    return [];
  }

  /** Проверить соответствие фильтру */
  isMatchFilter(filter: string, value: string): boolean {
    return true;
  }
}