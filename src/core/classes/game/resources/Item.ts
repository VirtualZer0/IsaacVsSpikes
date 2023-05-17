import { ItemPool } from '@/core/types/game/ItemPool';
import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { Resource } from '../../base/Resource';
import { LocaleText } from '../../base/LocaleText';
import {
  createStatModifier,
  IStatModifier,
} from './sub/character/IStatModifier';
import { SpriteAnimation } from './sub/gfx/SpriteAnimation';
import { ItemEffect } from './sub/item/ItemEffect';
import { ResourceLink } from '../../base/ResourceLink';
import { useEditorStore } from '@/store/editor';

export class Item extends Resource {
  /** Анимации предмета */
  animations: SpriteAnimation[] = [];

  /** Открыт ли предмет */
  isOpen = false;

  /** Описание предмета */
  desc: LocaleText = {};

  /** Приоритет предмета */
  priority = 0;

  /** Эффекты предмета */
  effects: ItemEffect[] = [];

  /** Пул предмета */
  pools: ItemPool[] = [];

  constructor() {
    super();
    const anim = new SpriteAnimation();
    anim.name = 'idle';
    this.animations.push(anim);
  }

  onPickup?: Nullable<() => void> = null;
  onRoomChange?: Nullable<() => void> = null;

  override getPreview(): Promise<string> {
    if (
      this.animations[0]?.spritesheet &&
      'src' in this.animations[0]?.spritesheet
    ) {
      const sprite = this.animations[0].spritesheet;

      if (typeof sprite.src !== 'string') {
        const resLink = this.animations[0].spritesheet.src as ResourceLink;
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
            (this.animations[0].spritesheet as SpriteSource).src
          }"/>`
        );
      }
    } else return super.getPreview();
  }
}
