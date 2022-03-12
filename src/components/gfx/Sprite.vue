<template>
  <div
    class="sprite"
    :style="{
      background: `no-repeat url(/res/gfx/${src.src}) left ${frame*src.width}px center`,
      backgroundSize: 'contain',
      transform: `translate(${x}px, ${y}px)`,
      width: `${width}vmax`,
      height: `${height}vmax`,
      position: relative ? 'unset' : 'absolute'
    }"
  />
</template>

<script lang="ts">
import {core} from "@/core/Core";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from "vue";

export default defineComponent({
  name: 'Sprite',
  props: {
    frames: {
      type: Number,
      default: 1
    },

    startFrame: {
      type: Number,
      default: 0
    },

    x: {
      type: Number,
      default: 0
    },

    y: {
      type: Number,
      default: 0
    },

    width: {
      type: Number,
      default: 5
    },

    height: {
      type: Number,
      default: 5
    },

    relative: {
      type: Boolean,
      default: false
    },

    src: {
      type: Object as PropType<SpriteSource>,
      default: () => ({}),
      required: true
    }
  },

  setup(props) {

    let frame = ref(0);

    const tick = (): void => {

      if (frame.value >= props.frames-1)
        frame.value = 0;
      else
        frame.value ++;

    }

    onMounted(() => props.frames > 1 ? core.spriteManager.addSprite(tick) : null);
    onBeforeUnmount(() => props.frames > 1 ? core.spriteManager.removeSprite(tick) : null);

    return {frame}
  }
})
</script>

<style lang="scss" scoped>
.sprite {
  display: inline-block;
  backface-visibility: hidden;
  left: 0;
  top: 0;
}
</style>