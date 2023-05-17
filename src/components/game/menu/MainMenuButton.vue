<template>
  <button
    class="main-menu-button"
    :style="computedStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="router.push(to)"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  rotation: {
    type: Number,
    default: 0,
  },
  to: {
    type: String,
    default: '',
  },
});

const isHover = ref(false);
const router = useRouter();
const computedStyle = computed(() => {
  if (isHover.value) {
    const r = props.rotation > 0 ? props.rotation + 1.5 : props.rotation - 1.5;
    return {
      transform: `rotate(${r}deg)`,
      scale: 1.1,
    };
  }
  return {
    transform: `rotate(${props.rotation}deg)`,
  };
});
</script>
<style lang="scss" scoped>
.main-menu-button {
  width: 30vw;
  height: 7vh;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
}
</style>
