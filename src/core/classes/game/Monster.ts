import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { MonsterEffect } from "./sub/MonsterEffect";
import { ResourceLink } from "../base/ResourceLink";
import { useEditorStore } from "@/store/editor";
import { library } from "@/core/Core";
import { MonsterAnimation } from "./sub/monster/MonsterAnimation";

export class Monster extends Resource {
  /** Анимации */
  animations: MonsterAnimation = new MonsterAnimation();

  /** Описание монстра */
  desc: LocaleText = {};

  /** Визуальные эффекты монстра */
  effects: MonsterEffect[] = [];

  override getPreview(): Promise<string> {
    if (
      this.animations?.idle?.spritesheet &&
      "src" in this.animations.idle.spritesheet
    ) {
      const sprite = this.animations.idle.spritesheet as SpriteSource;

      if (typeof sprite.src !== "string") {
        const resLink = (this.animations.idle.spritesheet as SpriteSource)
          .src as ResourceLink;
        const editor = useEditorStore();

        const res = editor.assets.get(resLink.id);

        if (!res) {
          return super.getPreview();
        } else {
          return res.getPreview();
        }
      } else {
        return Promise.resolve(
          `<img lazy src="/assets/${
            (this.animations.idle.spritesheet as SpriteSource).src
          }"/>`
        );
      }
    } else return super.getPreview();
  }
}
