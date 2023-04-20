import { ResourceLink } from '@/core/classes/base/ResourceLink';

export type SpriteSource = {
  src?: ResourceLink | string;
};

export type WeightedSpriteSource = SpriteSource & {
  weight?: number;
};
