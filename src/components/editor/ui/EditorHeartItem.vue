<template>
  <div class="container">
    <div
      v-if="container"
      class="heart heart-container"
      @click="
        !active
          ? emit('select', containerType)
          : type
          ? emit('empty')
          : emit('remove')
      "
    >
      <svg class="heart" :class="getColor()" viewBox="0 0 24 24" v-if="type">
        <path
          v-if="getHalf()"
          d="M13,7.2V17.74L13,20.44L12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C10,3 13,5 13,7.2Z"
        />
        <path
          v-else
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
        />
      </svg>
      <svg class="heart subheart white" viewBox="0 0 24 24" v-if="isWhite">
        <path
          d="M13,7.2V17.74L13,20.44L12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C10,3 13,5 13,7.2Z"
        />
      </svg>
      <svg
        class="container-svg"
        :class="{ golden: isGolden }"
        viewBox="0 0 24 24"
        v-if="containerType == HeartContainerType.DEFAULT"
      >
        <path
          d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
        />
      </svg>
    </div>
    <template v-else>
      <svg
        class="heart"
        :class="getColor()"
        viewBox="0 0 24 24"
        @click="!active ? emit('select', type) : emit('remove')"
      >
        <path
          v-if="getHalf()"
          d="M13,7.2V17.74L13,20.44L12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C10,3 13,5 13,7.2Z"
        />
        <path
          v-else
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
        />
      </svg>
      <svg class="heart subheart white" viewBox="0 0 24 24" v-if="isWhite">
        <path
          d="M13,7.2V17.74L13,20.44L12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C10,3 13,5 13,7.2Z"
        />
      </svg>
      <svg class="heart subheart golden" viewBox="0 0 24 24" v-if="isGolden">
        <path
          d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
        />
      </svg>
    </template>
    <svg v-if="getAdditional()" class="additional" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
    </svg>
  </div>
</template>

<script lang="ts">
import { HeartContainerType } from '@/core/types/game/HeartContainerType';
import { HeartType } from '@/core/types/game/HeartType';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'EditorHeartItem',
  emits: ['select', 'empty', 'remove'],
  props: {
    container: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<HeartType | null>,
      default: null,
    },
    containerType: {
      type: String as PropType<HeartContainerType | null>,
      default: null,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
    isGolden: {
      type: Boolean,
      default: false,
    },
    isAdditionnal: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const getColor = () => {
      switch (props.type) {
        case HeartType.RED:
        case HeartType.HALF_RED:
        case HeartType.ADDITIONAL_RED:
        case HeartType.ADDITIONAL_HALF_RED:
          return 'red';
        case HeartType.BLUE:
        case HeartType.HALF_BLUE:
          return 'blue';
        case HeartType.BLACK:
        case HeartType.HALF_BLACK:
          return 'black';
        case HeartType.GOLDEN:
        case HeartType.ADDITIONAL_GOLDEN:
          return 'golden';
        case HeartType.WHITE:
        case HeartType.ADDITIONAL_WHITE:
          return 'white';
        case HeartType.ROTTEN:
        case HeartType.ADDITIONAL_ROTTEN:
          return 'rotten';
        default:
          return '';
      }
    };

    const getHalf = () => {
      if (props.type?.includes('half') || props.type?.includes('white')) {
        return true;
      }

      return false;
    };

    const getAdditional = () => {
      if (props.type?.includes('additional')) {
        return true;
      }

      return false;
    };

    return {
      HeartType,
      HeartContainerType,
      getColor,
      getHalf,
      getAdditional,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  @include center;
  position: relative;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
}
.heart {
  width: 36px;
  height: 36px;

  &-container {
    position: relative;
    @include center;

    svg {
      position: absolute;
      left: 0;
      right: 0;
    }

    .heart {
      width: 30px;
      height: 30px;
      left: 3px;
    }
  }

  &.red {
    fill: #f44336;
  }
  &.blue {
    fill: #2196f3;
  }

  &.black {
    fill: #424242;
  }

  &.golden {
    fill: #fbc02d;
  }

  &.rotten {
    fill: #558b2f;
  }

  &.white {
    fill: #b0bec5;
  }
}

.subheart {
  position: absolute;
  pointer-events: none;

  &.white {
    transform: scaleX(-1);
    width: 36px;
  }

  &.golden {
    width: 42px;
    height: 42px;
  }
}

.golden {
  fill: #fbc02d;
}

.additional {
  position: absolute;
  width: 21px;
  height: 21px;
  left: -4px;
  top: 0px;
  pointer-events: none;
}
</style>
