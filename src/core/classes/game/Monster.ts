import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { Resource } from "../base/Resource";
import { LocaleText } from "../base/LocaleText";
import { MonsterEffect } from "./sub/MonsterEffect";
import { ResourceLink } from "../base/ResourceLink";
import { useEditorStore } from "@/store/editor";
import { library } from "@/core/Core";

export class Monster extends Resource {
  /** Спрайт монстра */
  sprite: SpriteSource | null = null;

  /** Описание монстра */
  desc: LocaleText = {};

  /** Визуальные эффекты монстра */
  effects: MonsterEffect[] = [];

  override getPreview(): Promise<string> {
    if (this.sprite && 'src' in this.sprite) {
      const sprite = this.sprite as SpriteSource;

      if (typeof sprite.src !== 'string') {
        const resLink = (this.sprite as SpriteSource).src as ResourceLink;
        const editor = useEditorStore();

        const res = editor.assets.get(resLink.id);

        if (!res) {
          return super.getPreview();
        }
        else {
          return res.getPreview();
        }
      }
      else {
        return Promise.resolve(`<img lazy src="/assets/${(this.sprite as SpriteSource).src}"/>`);
      }
    }
    else return super.getPreview();
  }
}