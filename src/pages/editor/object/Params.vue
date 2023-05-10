<template>
  <div class="object-editor-general eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.entityType.main`) }}</label>
      <editor-combobox
        :items="entityTypes"
        :value="curEntityObject.type"
        @change="switchEntityType($event)"
      />
    </div>

    <!-- Object editor -->
    <div class="vertical-line" v-if="curEntityObject.type == EntityType.OBJECT">
      <label class="eui label">{{ $t(`editor.destroyable`) }}</label>
      <div class="horizontal-line">
        <editor-checkbox
          v-model="(curEntityObject.entityData as IEntityObjectData).isDestroyable"
        />
        {{ $t('editor.enabled') }}
      </div>
    </div>
    <div
      class="vertical-line"
      v-if="curEntityObject.type == EntityType.OBJECT && (curEntityObject.entityData as IEntityObjectData).isDestroyable"
    >
      <label class="eui label">{{ $t(`editor.destructStages`) }}</label>
      <editor-entity-stages-list :entity="curEntityObject" />
    </div>

    <!-- Stats changer -->
    <editor-stats-form
      v-else-if="curEntityObject.type == EntityType.PICKUP"
      :stat-modifier="(curEntityObject.entityData as IStatModifier)"
    />

    <!-- Loot table -->
    <div
      class="vertical-line"
      v-else-if="curEntityObject.type == EntityType.CHEST"
    >
      <label class="eui label">{{ $t(`editor.lootTable`) }}</label>
      <editor-loot-table
        :loot-table="(curEntityObject.entityData as LootTable[])"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import { EntityObject } from '@/core/classes/game/EntityObject';
import { defineComponent, onBeforeMount, PropType, reactive } from 'vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';
import EditorCombobox from '@/components/editor/ui/EditorCombobox.vue';
import { EntityType } from '@/core/types/game/EntityType';
import { useI18n } from 'vue-i18n';
import {
  IEntityObjectData,
  createEntityObjectData,
} from '@/core/classes/game/sub/entityObject/IEntityObjectData';
import {
  createStatModifier,
  IStatModifier,
} from '@/core/classes/game/sub/character/IStatModifier';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';
import EditorEntityStagesList from '@/components/editor/ui/EditorEntityStagesList.vue';
import EditorStatsForm from '@/components/editor/forms/EditorStatsForm.vue';
import EditorLootTable from '@/components/editor/ui/EditorLootTable.vue';
import { LootTable } from '@/core/classes/game/LootTable';

export default defineComponent({
  components: {
    EditorLocaleInput,
    EditorLocaleText,
    EditorTagList,
    EditorCombobox,
    EditorCheckbox,
    EditorEntityStagesList,
    EditorStatsForm,
    EditorLootTable,
  },
  name: 'EditorEntityObjectParams',
  props: {
    entityObject: {
      type: Object as PropType<EntityObject>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const { t } = useI18n();

    const entityTypes = Object.values(EntityType)
      .filter((et) => et != EntityType.MONSTER)
      .map((et) => ({
        name: t(`editor.entityType.${et}`),
        value: et,
      }));

    const curEntityObject = reactive(props.entityObject);

    const switchEntityType = (et: EntityType) => {
      curEntityObject.type = et;
      curEntityObject.tags = curEntityObject.tags.filter(
        (tag) => !['object', 'pickup', 'chest', 'special'].includes(tag)
      );

      curEntityObject.tags.push(et);

      switch (et) {
        case EntityType.OBJECT:
          curEntityObject.entityData = createEntityObjectData();
          break;

        case EntityType.PICKUP:
          curEntityObject.entityData = createStatModifier({
            removedTags: true,
            removeHealth: true,
            damage: true,
          });
          break;

        case EntityType.CHEST:
          curEntityObject.entityData = [];
          break;
      }
    };

    onBeforeMount(() => {
      if (!curEntityObject.entityData) {
        switchEntityType(curEntityObject.type);
      }
    });

    return {
      EntityType,
      curEntityObject,
      emit,
      entityTypes,
      switchEntityType,
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

.horizontal-line {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
