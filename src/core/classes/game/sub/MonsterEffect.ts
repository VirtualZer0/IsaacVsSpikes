export enum MonsterEffectType {

  FLY = 'fly',
  RAINBOW = 'rainbow',
  SMALL = 'small',
  BIG = 'big',
  CUSTOM = 'custom'

}

export class MonsterEffect {

  type: MonsterEffectType = MonsterEffectType.CUSTOM;
  styles: string | null = null;
  speed: number = 0;

}