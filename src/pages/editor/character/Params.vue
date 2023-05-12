<template>
  <div class="character-editor-general eui edit-form">
    <!-- Stats changer -->
    <editor-stats-form :stat-modifier="curCharacter" />
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.items`) }}</label>
      <editor-link-list
        :links="curCharacter.startItems"
        :type="ResourceType.ITEM"
      />
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
import { EntityType } from '@/core/types/game/EntityType';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';
import EditorEntityStagesList from '@/components/editor/ui/EditorEntityStagesList.vue';
import EditorStatsForm from '@/components/editor/forms/EditorStatsForm.vue';
import EditorLinkList from '@/components/editor/ui/EditorLinkList.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  components: {
    EditorLocaleInput,
    EditorLocaleText,
    EditorTagList,
    EditorCombobox,
    EditorCheckbox,
    EditorEntityStagesList,
    EditorStatsForm,
    EditorLinkList,
  },
  name: 'EditorCharacterParams',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curCharacter = reactive(props.character);

    return {
      EntityType,
      curCharacter,
      emit,
      ResourceType,
    };
  },
});
</script>

<style lang="scss" scoped>
.input.small {
  width: 100px;
}

.character-split {
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

.horizontal-line {
  display: flex;
  align-characters: center;
  gap: 12px;
}
</style>
