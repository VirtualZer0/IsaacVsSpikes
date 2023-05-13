<template>
  <div class="editor-hearts">
    <div class="editor-hearts-container">
      <editor-heart-item
        v-for="(container, num) in curHealth.containers"
        :key="`c${num}${container.type}${container.heart?.type}`"
        container
        :containerType="container.type"
        :isWhite="container.white"
        :isGolden="container.golden"
        :type="container.heart?.type"
        active
        @empty="controller.emptyContainer(num)"
        @remove="controller.removeContainer(num)"
      />
      <editor-heart-item
        v-for="(heart, num) in curHealth.hearts"
        :key="`h${num}`"
        :isWhite="heart.white"
        :isGolden="heart.golden"
        :type="heart.type"
        active
        @remove="controller.removeHeart(num)"
      />
      <editor-heart-item
        v-for="(heart, num) in curHealth.additionalHearts"
        :key="`h${num}`"
        :isWhite="heart.white"
        :isGolden="heart.golden"
        :type="heart.type"
        active
        @remove="controller.removeAdditionalHeart(num)"
      />
    </div>
    <div class="editor-hearts-action">
      <button
        class="eui circleButton editor-hearts-add"
        @click="showAddList = !showAddList"
      >
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C20 12.31 19.31 12.11 18.59 12.04C19.5 10.8 20 9.65 20 8.5C20 6.5 18.5 5 16.5 5C14.96 5 13.46 6 12.93 7.36H11.07C10.54 6 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.04 18.61C12.12 19.37 12.34 20.09 12.67 20.74M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z"
          />
        </svg>
      </button>
      <div class="editor-hearts-add-list" v-if="showAddList">
        <editor-heart-item
          class="item"
          v-for="(container, num) in HeartContainerType"
          container
          :key="`ac${num}`"
          :containerType="container"
          @select="controller.addContainer($event)"
        />
        <editor-heart-item
          class="item"
          v-for="(heart, num) in HeartType"
          :key="`ah${num}`"
          :type="heart"
          @select="addHeart($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CharacterHearts } from '@/core/classes/game/resources/sub/character/CharacterHealth';
import { CharacterHealthController } from '@/core/classes/game/resources/sub/character/CharacterHealthController';
import { HeartContainerType } from '@/core/types/game/HeartContainerType';
import { HeartType } from '@/core/types/game/HeartType';
import { defineComponent, PropType, ref } from 'vue';
import EditorHeartItem from './EditorHeartItem.vue';

export default defineComponent({
  name: 'EditorHearts',
  components: { EditorHeartItem },
  props: {
    health: {
      type: Object as PropType<CharacterHearts>,
      required: true,
    },
  },
  setup(props) {
    const curHealth = ref(props.health);
    const showAddList = ref(false);
    const controller = new CharacterHealthController();
    controller.replaceHealth(curHealth.value);

    const addHeart = (type: HeartType) => {
      let amount = 0;
      switch (type) {
        case HeartType.HALF_RED:
        case HeartType.HALF_BLUE:
        case HeartType.HALF_BLACK:
          amount = 1;
        default:
          amount = 2;
      }
      controller.addHeart(type, amount);
    };

    return {
      curHealth,
      HeartType,
      HeartContainerType,
      showAddList,
      controller,
      addHeart,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-hearts {
  display: flex;
  flex-direction: column;

  &-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 240px;
  }

  &-action {
    margin-top: 10px;
    display: inline-block;
    position: relative;
    height: 42px;
  }

  &-add {
    position: absolute;
    height: 42px;
    width: 42px;
    color: $editorBg;
    background: $editorAccent;
    z-index: 10;

    &-list {
      transform-origin: center left;
      animation: heartListAppear 0.2s ease-in-out;
      background: $editorBg;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      padding: 0 12px 0 48px;
      z-index: 0;
      border-radius: 42px;
      height: 42px;
    }
  }
}

@keyframes heartListAppear {
  0% {
    transform: translateX(20px) scaleX(0);
  }
  100% {
    transform: translateX(0) scaleX(1);
  }
}
</style>
