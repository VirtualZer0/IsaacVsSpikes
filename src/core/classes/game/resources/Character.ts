import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { useEditorStore } from '@/store/editor';
import { IVisibleSprite } from '../../base/IVisibleSprite';
import { LocaleText } from '../../base/LocaleText';
import { Resource } from '../../base/Resource';
import { ResourceLink } from '../../base/ResourceLink';
import { CharacterConsumables } from './sub/character/CharacterConsumables';
import { CharacterHearts } from './sub/character/CharacterHealth';
import { CharacterStats } from './sub/character/CharcterStats';
import { IStatModifier } from './sub/character/IStatModifier';
import { SpriteAnimation } from './sub/gfx/SpriteAnimation';

export class Character
  extends Resource
  implements IStatModifier, IVisibleSprite
{
  animations: SpriteAnimation[] = [];
  stats: CharacterStats = new CharacterStats();
  consumables: CharacterConsumables = new CharacterConsumables();
  addHealth: CharacterHearts = new CharacterHearts();
  addedTags: string[] = [];
  startItems: ResourceLink[] = [];

  /** Описание объекта */
  desc: LocaleText = {};
  rules = {
    allowRedHearts: true,
    replaceBlueHeartsToBlack: false,
  };

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
