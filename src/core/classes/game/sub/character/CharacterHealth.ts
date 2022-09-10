import { HeartContainerType } from "@/core/types/game/HeartContainerType";
import { HeartType } from "@/core/types/game/HeartType";

export class CharacterHearts {
  /** Контейнеры */
  containers: HeartContainer[] = [];
  /** Сердца */
  hearts: Heart[] = [];
  /** Сердца для расчетов, не учавствуют в здоровье игрока */
  additionalHearts: Heart[] = [];
}

export class HeartContainer {
  golden = false;
  white = false;
  heart: Heart | null = null;
  type: HeartContainerType = HeartContainerType.DEFAULT;

  constructor(
    type: HeartContainerType = HeartContainerType.DEFAULT,
    white = false,
    golden = false,
    heart: Heart | null = null
  ) {
    this.type = type;
    this.white = white;
    this.golden = golden;
    this.heart = heart;
  }
}

export class Heart {
  golden = false;
  white = false;
  type: HeartType = HeartType.RED;

  constructor(type: HeartType = HeartType.RED, white = false, golden = false) {
    this.type = type;
    this.white = white;
    this.golden = golden;
  }
}
