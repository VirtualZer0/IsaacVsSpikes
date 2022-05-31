import { ICharacterPropsBoolean, ICharacterPropsRange } from "./ICharacterRangeProps";

export class CharacterStats {

  countdown: number = 0;
  health: number = 0;
  damage: number = 0;
  speed: number = 0;
  skill: number = 0;
  flight: boolean = false;

  devilChance: number = 0;
  angelChance: number = 0;

}

export class CharacterStatsCheckData {

  countdown: ICharacterPropsRange = {
    type: 'number',
    enabled: false,
    from: 0,
    to: 0,
  };

  health: ICharacterPropsRange = {
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

  flight: ICharacterPropsBoolean = {
    type: 'boolean',
    enabled: false,
    value: false,
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

}