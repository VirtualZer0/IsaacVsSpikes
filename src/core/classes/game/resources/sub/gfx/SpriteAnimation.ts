import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { v4 as uuid } from 'uuid';
import { IImageMetadata } from '../asset/IImageMetadata';

export class SpriteAnimation {
  id: string = uuid();
  name = '';
  spritesheet: SpriteSource | null = null;
  metadata: IImageMetadata | undefined = {
    width: 64,
    height: 64,
  };
  count = 1;
  loop = true;
  speed = 250;
  transform: Record<string, string | number>[] = [];
  baseStyle: Record<string, string | number> = {};
  smooth = true;
  saveAspectRatio = true;
}
