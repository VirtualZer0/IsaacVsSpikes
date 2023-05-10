<template>
  <div class="editor-animation-list">
    <div
      class="editor-animation-list-item"
      :class="{ active: anim.id === selected }"
      v-for="(anim, num) in curEntity.animations"
      :key="anim.id"
      @click="emits('select', anim.id)"
    >
      <div class="animation-name">{{ anim.name || 'No name' }}</div>
      <Sprite
        :animation="anim"
        :width="64"
        :height="64"
        relative
        oneFrameTick
      />
      <div
        class="eui button editor-animation-list-item-remove"
        @click.stop="curEntity.animations.splice(num, 1)"
      >
        <svg style="width: 16px; height: 16px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
    </div>
    <div class="eui button editor-animation-list-add" @click="addAnimation()">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue';
import Sprite from '@/components/gfx/Sprite.vue';
import { SpriteAnimation } from '@/core/classes/game/sub/gfx/SpriteAnimation';
import { IVisibleSprite } from '@/core/classes/base/IVisibleSprite';

const props = defineProps({
  entity: {
    type: Object as PropType<IVisibleSprite>,
    required: true,
  },
  selected: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(['select']);

const curEntity = ref(props.entity);
const addAnimation = () => {
  const name = `anim-${Object.keys(curEntity.value.animations).length}`;
  curEntity.value.animations.push(new SpriteAnimation());
  emits('select', name);
};
</script>
<style lang="scss" scoped>
.editor-animation-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  &-item {
    position: relative;
    padding: 6px;
    border: 2px solid $editorFg;
    width: 140px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    .button {
      background: $editorBg;
    }

    &.active {
      background: $editorFg;
      color: $editorBg;
    }

    &-remove {
      position: absolute;
      padding: 0;
      right: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border-right: none;
      border-top: none;

      &:hover {
        background: #f44336;
      }
    }

    .animation-name {
      margin-bottom: 8px;
    }
  }

  &-add {
    width: 42px;
    height: 42px;
  }
}
</style>
