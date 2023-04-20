<template>
  <div class="editor-animation">
    <div class="editor-animation-top"></div>
    <div class="editor-animation-preview" ref="el"></div>
  </div>
</template>

<script setup lang="ts">
import { SpriteAnimation } from '@/core/classes/game/sub/gfx/SpriteAnimation';
import { SpriteController } from '@/core/classes/game/sub/gfx/SpriteController';
import { PropType, ref } from 'vue';
import EditorCombobox from './EditorCombobox.vue';

const props = defineProps({
  animation: Object as PropType<SpriteAnimation>,
});
const anim = ref(props.animation);
const el = ref();
if (!anim.value) {
  anim.value = new SpriteAnimation();
}
const controller = ref(new SpriteController(anim.value));
</script>

<style lang="scss" scoped>
.editor-animation {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  &-top {
    display: flex;
    flex-direction: row;
    height: 50px;
    width: 100%;
  }
  &-preview {
    height: 100%;
    width: 100%;
  }
}
</style>
