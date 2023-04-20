<template>
  <div class="object-editor-general eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="entityObject.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.note`) }}</label>
      <textarea v-model="curEntityObject.note" class="eui textarea small" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="entityObject.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.description`) }}</label>
      <editor-locale-text class="input" :text="entityObject.desc" />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import { EntityObject } from '@/core/classes/game/EntityObject';
import { defineComponent, PropType, reactive } from 'vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';

export default defineComponent({
  components: { EditorLocaleInput, EditorLocaleText, EditorTagList },
  name: 'EditorEntityObjectGeneral',
  props: {
    entityObject: {
      type: Object as PropType<EntityObject>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curEntityObject = reactive(props.entityObject);

    return {
      curEntityObject,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.input.small {
  width: 100px;
}

.object-split {
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
