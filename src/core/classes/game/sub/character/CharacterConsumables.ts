import {
  ICharacterPropsBoolean,
  ICharacterPropsRange,
} from "./ICharacterRangeProps";

export class CharacterConsumables {
  coins = 0;
  keys = 0;
  bombs = 0;
  blueFriends = 0;

  goldenKey = false;
  goldenBomb = false;
}

export class CharacterConsumablesCheckData {
  coins: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  keys: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  bombs: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  blueFriends: ICharacterPropsRange = {
    type: "number",
    enabled: false,
    from: 0,
    to: 0,
  };

  goldenKey: ICharacterPropsBoolean = {
    type: "boolean",
    enabled: false,
    value: false,
  };

  goldenBomb: ICharacterPropsBoolean = {
    type: "boolean",
    enabled: false,
    value: false,
  };
}
