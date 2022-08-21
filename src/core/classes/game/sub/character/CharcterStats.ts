import { ICharacterPropsBoolean, ICharacterPropsRange, ICharacterPropsTags } from "./ICharacterRangeProps";

export class CharacterStats {

  countdown: number = 0;
  health: number = 0;
  damage: number = 0;
  speed: number = 0;
  skill: number = 0;

  devilChance: number = 0;
  angelChance: number = 0;
  tags: string[] = [];

}

export class CharacterStatsCheckData {

  countdown: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  damage: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  speed: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  skill: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  devilChance: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  angelChance: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  tags: ICharacterPropsTags = {
    type: 'tags',
    enabled: false,
    value: [],
  };

  health: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  redHearts: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0
  };

  blueHearts: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0
  };

  blackHearts: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0
  };

  goldenHearts: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0
  };

  whiteHearts: ICharacterPropsBoolean = {
    type: 'boolean',
    enabled: false,
    value: false,
  };

}