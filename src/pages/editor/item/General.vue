<template>
  <div class="item-editor-general eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="item.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.note`) }}</label>
      <textarea v-model="curCharacter.note" class="eui textarea small" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="item.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.description`) }}</label>
      <editor-locale-text class="input" :text="item.desc" />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import { Character } from '@/core/classes/game/Character';
import { defineComponent, PropType, reactive } from 'vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';
import EditorCombobox from '@/components/editor/ui/EditorCombobox.vue';
import EditorPoolList from '@/components/editor/ui/EditorPoolList.vue';

export default defineComponent({
  components: {
    EditorLocaleInput,
    EditorLocaleText,
    EditorTagList,
    EditorCombobox,
    EditorPoolList,
  },
  name: 'EditorCharacterGeneral',
  props: {
    item: {
      type: Object as PropType<Character>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curCharacter = reactive(props.item);

    return {
      curCharacter,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.input.small {
  width: 100px;
}

.item-split {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  .vertical-line {
    width: auto;
    max-width: 33%;
  }

  .vertical-split {
    width: 3px;
    height: 120px;
    background-color: $editorFg;
  }
}
</style>
