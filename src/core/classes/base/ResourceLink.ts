export type ResourceLink = {
  id: string;
  type: string;
};

export type WeightedResourceLink = ResourceLink & {
  weight: number;
};
