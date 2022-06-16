import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { MonsterEffect } from "./sub/MonsterEffect";

export class Monster extends Resource {
  /** Открыт ли монстр */
  isOpen: boolean = false;

  /** Спрайт монстра */
  sprite: SpriteSource | null = null;

  /** Описание монстра */
  desc: LocaleText = {};

  /** Визуальные эффекты монстра */
  effects: MonsterEffect[] = [];
}