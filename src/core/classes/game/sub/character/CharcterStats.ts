import {
  ICharacterPropsBoolean,
  ICharacterPropsRange,
  ICharacterPropsTags,
} from "./ICharacterRangeProps";

export class CharacterStats {
  countdown = 0;
  damage = 0;
  speed = 0;
  skill = 0;

  devilChance = 0;
  angelChance = 0;
}

export class CharacterStatsCheckData {
  countdown: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  damage: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  speed: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  skill: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  devilChance: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  angelChance: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  health: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  tags: ICharacterPropsTags = {
    type: "tags",
    enabled: false,
    value: [],
  };
}
