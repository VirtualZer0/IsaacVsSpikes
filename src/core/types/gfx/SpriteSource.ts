import { ResourceLink } from "@/core/classes/base/ResourceLink";

export type SpriteSource = {
  width?: number;
  height?: number;
  src?: ResourceLink | string;
};

export type WeightedSpriteSource = SpriteSource & {
  weight?: number;
};
