<template>
  <div class="object-editor-general eui edit-form">
    <div class="no-effects" v-if="effects.length == 0">
      {{ $t('editor.noEffects') }}
    </div>
    <div
      class="effects-item"
      v-for="(effect, num) in effects"
      :key="Math.random()"
    >
      <button class="eui button delete" @click="effects.splice(num, 1)">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </button>
      <div class="effect-title">{{ $t('editor.effect') }} #{{ num + 1 }}</div>
      <div class="vertical-line">
        <label class="eui label">{{ $t(`editor.playerTags`) }}</label>
        <EditorTagList :tags="effect.playerTags" />
      </div>
      <div class="vertical-line">
        <label class="eui label">{{ $t(`editor.roomTags`) }}</label>
        <EditorTagList :tags="effect.roomTags" />
      </div>
      <EditorStatsForm :stat-modifier="effect.statModifier" />
    </div>
    <div class="effects-item-block-add">
      <button @click="addBlock" class="eui button">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import { Item } from '@/core/classes/game/Item';
import { defineComponent, PropType, reactive } from 'vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';
import EditorCombobox from '@/components/editor/ui/EditorCombobox.vue';
import { EntityType } from '@/core/types/game/EntityType';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';
import EditorEntityStagesList from '@/components/editor/ui/EditorEntityStagesList.vue';
import EditorStatsForm from '@/components/editor/forms/EditorStatsForm.vue';
import { createStatModifier } from '@/core/classes/game/sub/character/IStatModifier';

export default defineComponent({
  components: {
    EditorLocaleInput,
    EditorLocaleText,
    EditorTagList,
    EditorCombobox,
    EditorCheckbox,
    EditorEntityStagesList,
    EditorStatsForm,
  },
  name: 'EditorItemParams',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curItem = reactive(props.item);
    const effects = reactive(curItem.effects);
    const addBlock = () => {
      effects.push({
        playerTags: [],
        roomTags: [],
        statModifier: createStatModifier({
          damage: true,
          removedTags: true,
          removeHealth: true,
        }),
      });
    };

    return {
      EntityType,
      curItem,
      effects,
      emit,
      addBlock,
    };
  },
});
</script>

<style lang="scss" scoped>
.object-editor-general {
  max-height: 82.8vh;
}
.effects-item-block-add {
  display: flex;
  justify-content: center;
  height: 2px;
  background: $editorFg;
  margin-left: 36px;
  margin-top: 16px;
  margin-bottom: 16px;

  button {
    height: 18px;
    width: 20%;
    padding-top: 6px;
    font-weight: bold;
  }
}

.effects-item {
  position: relative;
  border: 2px solid $editorFg;
  padding: 12px;
  margin-bottom: 12px;

  .delete {
    position: absolute;
    right: 16px;
  }
}

.effect-title {
  font-weight: bold;
  font-size: 21px;
}

.no-effects {
  font-size: 3vw;
  color: $editorGray;
}
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

.horizontal-line {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
