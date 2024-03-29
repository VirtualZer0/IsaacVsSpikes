<template>
  <div class="level-editor-general eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="level.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="level.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.note`) }}</label>
      <textarea v-model="curLevel.note" class="eui textarea small" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.description`) }}</label>
      <editor-locale-text class="input" :text="level.desc" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.levelGen`) }}</label>
      <div class="line">
        <editor-checkbox v-model="curLevel.regular" class="checkbox" />
        <span>{{ $t(`editor.isRegular`) }}</span>
      </div>

      <div class="line" v-if="curLevel.regular">
        <span class="sublabel">{{ $t(`editor.weight`) }}</span>
        <input
          type="number"
          class="eui input small"
          v-model.number="curLevel.regularWeight"
          min="0"
          step=".1"
        />
      </div>

      <div class="line" v-if="curLevel.regular">
        <span class="sublabel">{{ $t(`editor.regularSlot`) }}</span>
        <input
          type="number"
          class="eui input small"
          v-model.number="curLevel.regularSlot"
          min="1"
          step="1"
        />
      </div>
    </div>

    <!-- Loot table -->
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.lootTable`) }}</label>
      <editor-loot-table :loot-table="curLevel.lootTable" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.musicStart`) }}</label>
      <editor-link
        :res="curLevel.musicStart"
        @select="curLevel.musicStart = $event"
        @remove="curLevel.musicStart = null"
        :type="ResourceType.ASSET"
      />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.musicLoop`) }}</label>
      <editor-link
        :res="curLevel.musicLoop"
        @select="curLevel.musicLoop = $event"
        @remove="curLevel.musicLoop = null"
        :type="ResourceType.ASSET"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import { Level } from '@/core/classes/game/resources/Level';
import { defineComponent, PropType, ref } from 'vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';
import EditorLink from '@/components/editor/ui/EditorLink.vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';
import EditorLootTable from '@/components/editor/ui/EditorLootTable.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  components: {
    EditorLocaleInput,
    EditorLocaleText,
    EditorCheckbox,
    EditorLink,
    EditorTagList,
    EditorLootTable,
  },
  name: 'EditorLevelGeneral',
  props: {
    level: {
      type: Object as PropType<Level>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curLevel = ref(props.level);

    return {
      emit,
      curLevel,
      ResourceType,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  margin-right: 12px;
}

.line {
  margin-bottom: 12px !important;

  .input.small {
    width: 85px;
    min-width: 85px;
    margin-left: 12px;
  }

  .sublabel {
    text-align: left;
    width: 115px;
  }
}
</style>
