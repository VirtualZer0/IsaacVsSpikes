import { EntityType } from '@/core/types/game/EntityType';
import { SpriteAnimation } from '../game/resources/sub/gfx/SpriteAnimation';
import { Resource } from './Resource';
import { ResourceLink } from './ResourceLink';
import { useEditorStore } from '@/store/editor';
import { SpriteSource } from '@/core/types/gfx/SpriteSource';

export class Entity extends Resource {
  animations: SpriteAnimation[] = [];
  type: EntityType = EntityType.OBJECT;

  constructor() {
    super();
    const anim = new SpriteAnimation();
    anim.name = 'idle';
    this.animations.push(anim);
  }

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
