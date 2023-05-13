import { ResourceLink } from '@/core/classes/base/ResourceLink';
import { IImageMetadata } from '@/core/classes/game/resources/sub/asset/IImageMetadata';

export type SpriteSource = {
  src?: ResourceLink | string;
  metadata?: IImageMetadata | undefined;
};

export type WeightedSpriteSource = SpriteSource & {
  weight?: number;
};
