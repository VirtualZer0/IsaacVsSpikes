<template>
  <div class="level-editor-generation eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="level.name" />
    </div>
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.description`) }}</label>
      <editor-locale-text class="input" :text="level.desc" />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import { Level } from '@/core/classes/game/Level';
import { defineComponent, PropType } from 'vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';

export default defineComponent({
  components: { EditorLocaleInput, EditorLocaleText },
  name: 'EditorLevelGeneration',
  props: {
    level: {
      type: Object as PropType<Level>,
      required: true,
    },
  },

  setup(props, { emit }) {
    return {
      emit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
