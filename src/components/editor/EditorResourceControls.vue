<template>
  <div class="controls">
    <button
      class="eui button save"
      @click="emit('save')"
      :disabled="disableSave"
    >
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"
        />
      </svg>
    </button>

    <button class="eui button delete" @click="emit('cancel')">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/** Отображает кнопки сохранения и отмены в редакторе ресурса */
export default defineComponent({
  name: 'EditorResourceControls',
  emits: ['save', 'cancel'],

  props: {
    disableSave: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(_props, { emit }) {
    return { emit };
  },
});
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  gap: 4px;
}
</style>
