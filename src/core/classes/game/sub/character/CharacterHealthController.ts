/* eslint-disable @typescript-eslint/no-unused-vars */
import { HeartContainerType } from '@/core/types/game/HeartContainerType';
import { HeartType } from '@/core/types/game/HeartType';
import { Ref, ref } from 'vue';
import { Character } from '../../Character';
import { CharacterHearts, Heart, HeartContainer } from './CharacterHealth';

// TODO: Добавить вызов коллбэков для событий здоровья

/** Контроллер здоровья персонажа */
export class CharacterHealthController {
  /** Здоровье персонажа */
  health: Ref<CharacterHearts> = ref(new CharacterHearts());
  /** Позиция белого сердца */
  whiteHeartPos: number | null = null;
  /** Персонаж */
  character: Character;

  constructor(character: Character | null = null) {
    this.character = character ?? new Character();
  }

  /**
   * Заменить текущее здоровье на новое
   * @param health - Новое здоровье
   */
  replaceHealth(health: CharacterHearts) {
    this.health.value = health;
  }

  /**
   * Добавить контейнер к здоровью персонажа если это возможно
   * @param type Тип контейнера (на данный момент всегда DEFAULT)
   */
  addContainer(type: HeartContainerType = HeartContainerType.DEFAULT) {
    if (type !== HeartContainerType.DEFAULT) {
      return;
    }

    if (this.character.rules.allowRedHearts) {
      // Проверка переполнения контейнерами
      if (this.health.value.containers.length < 12) {
        // Проверка возможности замены внеконтейнерного сердца
        if (
          this.health.value.containers.length +
            this.health.value.hearts.length >=
          12
        ) {
          this.health.value.hearts.splice(
            this.health.value.hearts.length - 1,
            1
          );
        }

        this.health.value.containers.push(new HeartContainer());
      }
    } else {
      this.addHeart(HeartType.BLUE);
    }
  }

  addHeart(type: HeartType = HeartType.RED, amount = 1): void {
    if (type.includes('additional')) {
      return this.addAdditionalHeart(type);
    }

    if (type.includes('half')) {
      return this.addHeart(type.replace('half_', '') as HeartType, 1);
    }

    const halfHearts = amount % 2;
    const fullHearts = Math.floor((amount - halfHearts) / 2);

    this.heartRules[type]?.(fullHearts, halfHearts ? true : false);
  }

  addAdditionalHeart(type: HeartType = HeartType.RED): void {
    this.health.value.additionalHearts.push(new Heart(type));
  }

  removeAdditionalHeart(num: number): void {
    this.health.value.additionalHearts.splice(num, 1);
  }

  emptyContainer(num: number): void {
    if (this.health.value.containers[num]) {
      if (this.health.value.containers[num].heart !== null) {
        const heart = this.health.value.containers[num].heart as Heart;
        heart.golden = false;
        heart.white = false;
      }

      this.health.value.containers[num].heart = null;
    }

    this.health.value.containers = [
      ...this.health.value.containers.filter(
        (container) => container.heart !== null
      ),
      ...this.health.value.containers.filter(
        (container) => container.heart === null
      ),
    ];
  }

  removeContainer(num: number): void {
    this.health.value.containers.splice(num, 1);
  }

  removeHeart(num: number): void {
    this.health.value.hearts.splice(num, 1);
  }

  /** Правила добавления сердец */
  heartRules: {
    [key in HeartType]?: (fullHearts: number, halfHeart: boolean) => void;
  } = {
    /** Красные сердца */
    [HeartType.RED]: (fullHearts: number, halfHeart: boolean) => {
      if (
        !this.character.rules.allowRedHearts ||
        this.health.value.containers.length == 0
      )
        return;

      const availableContainers = this.health.value.containers.filter(
        (container) =>
          container.heart == null || container.heart.type == HeartType.HALF_RED
      );

      // Добавление полных сердец
      for (let i = 0; i < fullHearts && availableContainers.length > 0; i++) {
        const container = availableContainers.shift() as HeartContainer;
        if (container.heart == null) {
          container.heart = new Heart(HeartType.RED);
        }

        if (container.heart.type == HeartType.HALF_RED) {
          container.heart.type = HeartType.RED;
          if (halfHeart) {
            halfHeart = false;
            fullHearts++;
          } else {
            halfHeart = true;
          }
        }
      }

      // Добавление половины сердца
      if (halfHeart && availableContainers.length > 0) {
        if (availableContainers[0].heart == null) {
          availableContainers[0].heart = new Heart(HeartType.HALF_RED);
        } else {
          availableContainers[0].heart.type = HeartType.RED;
        }
      }
    },

    /** Гнилые сердца */
    [HeartType.ROTTEN]: (fullHearts: number, _halfHeart: boolean) => {
      if (
        !this.character.rules.allowRedHearts ||
        this.health.value.containers.length == 0
      )
        return;

      // Сначала заменяем половины красных сердце на гнилые
      let availableContainers = this.health.value.containers.filter(
        (container) => container.heart?.type == HeartType.HALF_RED
      );

      while (fullHearts > 0 && availableContainers.length > 0) {
        const container = availableContainers.shift() as HeartContainer;
        container.heart = new Heart(HeartType.ROTTEN);
        fullHearts--;
      }

      // Затем заполняем пустые контейнеры гнилыми сердцами
      availableContainers = this.health.value.containers.filter(
        (container) => container.heart == null
      );

      while (fullHearts > 0 && availableContainers.length > 0) {
        const container = availableContainers.shift() as HeartContainer;
        container.heart = new Heart(HeartType.ROTTEN);
        fullHearts--;
      }

      // Оставшиеся сердца вставляем вместо красных с конца
      availableContainers = this.health.value.containers
        .filter((container) => container?.heart?.type == HeartType.RED)
        .reverse();

      while (fullHearts > 0 && availableContainers.length > 0) {
        const container = availableContainers.shift() as HeartContainer;
        container.heart = new Heart(HeartType.ROTTEN);
        fullHearts--;
      }
    },

    /** Синие сердца */
    [HeartType.BLUE]: (fullHearts: number, halfHeart: boolean) => {
      if (this.health.value.containers.length == 12) return;
      if (this.character.rules.replaceBlueHeartsToBlack) {
        this.heartRules[HeartType.BLACK]?.(fullHearts, halfHeart);
        return;
      }

      const halfBlack = this.health.value.hearts.filter(
        (heart) => heart.type == HeartType.HALF_BLACK
      );

      const halfBlue = this.health.value.hearts.filter(
        (heart) => heart.type == HeartType.HALF_BLUE
      );

      // Сначала заменяем половины черных сердец на полностью черные
      if (halfBlack.length > 0) {
        const heart = halfBlack.pop() as { type: HeartType; golden: boolean };
        heart.type = HeartType.BLACK;

        if (halfHeart) {
          halfHeart = false;
        } else {
          halfHeart = true;
          fullHearts--;
        }
      }

      // Затем заменяем половины синих сердец на полностью синие
      if (halfBlue.length > 0) {
        const heart = halfBlue.pop() as { type: HeartType; golden: boolean };
        heart.type = HeartType.BLUE;

        if (halfHeart) {
          halfHeart = false;
        } else {
          halfHeart = true;
          fullHearts--;
        }
      }

      // Затем добавляем полные сердца
      while (
        fullHearts > 0 &&
        this.health.value.containers.length + this.health.value.hearts.length <
          12
      ) {
        this.health.value.hearts.push(new Heart(HeartType.BLUE));
        fullHearts--;
      }

      // Затем добавляем половину сердца
      if (
        halfHeart &&
        this.health.value.containers.length + this.health.value.hearts.length <
          12
      ) {
        this.health.value.hearts.push(new Heart(HeartType.HALF_BLUE));
      }
    },

    /** Черные сердца */
    [HeartType.BLACK]: (fullHearts: number, halfHeart: boolean) => {
      if (this.health.value.containers.length == 12) return;
      if (this.character.rules.replaceBlueHeartsToBlack) {
        this.heartRules[HeartType.BLACK]?.(fullHearts, halfHeart);
        return;
      }

      const halfBlack = this.health.value.hearts.filter(
        (heart) => heart.type == HeartType.HALF_BLACK
      );

      const halfBlue = this.health.value.hearts.filter(
        (heart) => heart.type == HeartType.HALF_BLUE
      );

      // Сначала заменяем половины черных сердец на полностью черные
      if (halfBlue.length > 0) {
        const heart = halfBlue.pop() as { type: HeartType; golden: boolean };
        heart.type = HeartType.BLUE;

        if (halfHeart) {
          halfHeart = false;
        } else {
          halfHeart = true;
          fullHearts--;
        }
      }

      // Затем заменяем половины синих сердец на полностью синие
      if (halfBlack.length > 0) {
        const heart = halfBlack.pop() as { type: HeartType; golden: boolean };
        heart.type = HeartType.BLACK;

        if (halfHeart) {
          halfHeart = false;
        } else {
          halfHeart = true;
          fullHearts--;
        }
      }

      // Затем добавляем полные сердца
      while (
        fullHearts > 0 &&
        this.health.value.containers.length + this.health.value.hearts.length <
          12
      ) {
        this.health.value.hearts.push(new Heart(HeartType.BLACK));
        fullHearts--;
      }

      // Затем добавляем половину сердца
      if (
        halfHeart &&
        this.health.value.containers.length + this.health.value.hearts.length <
          12
      ) {
        this.health.value.hearts.push(new Heart(HeartType.HALF_BLACK));
      }
    },

    /** Золотое сердце */
    [HeartType.GOLDEN]: (fullHearts: number, _halfHeart: boolean) => {
      const freeHearts = [
        ...this.health.value.containers.filter((heart) => !heart.golden),
        ...this.health.value.hearts.filter((heart) => !heart.golden),
      ];

      while (fullHearts > 0 && freeHearts.length > 0) {
        const heart = freeHearts.pop() as { type: HeartType; golden: boolean };
        if (heart) {
          heart.golden = true;
          fullHearts--;
        }
      }
    },

    /** Белое сердце */
    [HeartType.WHITE]: (_fullHearts: number, _halfHeart: boolean) => {
      // Поиск уже существующих белых сердец
      const whiteHearts = [
        ...this.health.value.hearts.filter((heart) => heart.white),
        ...this.health.value.containers.filter((heart) => heart.white),
      ];

      if (whiteHearts.length > 0) {
        // Если белое сердце уже есть, то заменяем на контейнер
        const heart = whiteHearts.pop() as { type: HeartType; white: boolean };
        heart.white = false;

        this.addContainer(HeartContainerType.DEFAULT);
      } else {
        const freeHearts = [
          ...this.health.value.containers
            .filter((heart) => !heart.white)
            .reverse(),
          ...this.health.value.hearts.filter((heart) => !heart.white),
        ];

        freeHearts[0].white = true;
      }
    },
  };
}
