export interface IEntityObjectData {
  isDestroyable: boolean;
  destructStages: string[];
}

export function createEntityObjectData(): IEntityObjectData {
  return {
    destructStages: [],
    isDestroyable: false,
  };
}
