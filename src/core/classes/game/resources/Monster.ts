import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { LocaleText } from '../../base/LocaleText';
import { ResourceLink } from '../../base/ResourceLink';
import { useEditorStore } from '@/store/editor';
import { SpriteAnimation } from './sub/gfx/SpriteAnimation';
import { Entity } from '../../base/Entity';
import { EntityType } from '@/core/types/game/EntityType';

export class Monster extends Entity {
  type = EntityType.MONSTER;

  /** Описание монстра */
  desc: LocaleText = {};

  /** Теги монстра */
  tags = ['monster'];

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
