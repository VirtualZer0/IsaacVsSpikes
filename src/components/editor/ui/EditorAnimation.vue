<template>
  <div class="editor-animation">
    <div class="editor-animation-preview">

    </div>
  </div>
</template>

<script lang="ts">
import { SpriteAnimation } from '@/core/classes/game/sub/gfx/SpriteAnimation';
import { SpriteController } from '@/core/classes/game/sub/gfx/SpriteController';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'EditorAnimation',
  props: {
    animation: Object as PropType<SpriteAnimation>
  },
  setup(props) {
    const anim = ref(props.animation);
    const el = ref(null);

    if (!anim.value) {
      anim.value = new SpriteAnimation();
    }

    const controller = ref(new SpriteController(anim.value));


    return { anim, controller };
  }
})
</script>

<style lang="scss" scoped>

</style>