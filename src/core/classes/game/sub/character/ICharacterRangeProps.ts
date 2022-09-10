export interface ICharacterPropsRange {
  type: "number";
  enabled: boolean;
  from: number;
  to: number;
}

export interface ICharacterPropsBoolean {
  type: "boolean";
  enabled: boolean;
  value: boolean;
}

export interface ICharacterPropsTags {
  type: "tags";
  enabled: boolean;
  value: string[];
}
