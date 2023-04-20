<template>
  <div class="editor-checkbox" @click="$emit('update:modelValue', !modelValue)">
    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
      <path
        d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
        :fill="modelValue ? '#333' : 'rgba(0,0,0,0)'"
      />
    </svg>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditorCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.editor-checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    border: solid 2px $editorFg;
  }

  svg,
  path {
    transition: fill 0.2s ease;
  }
}
</style>
