<template>
  <div class="editor-loot-table">
    <div class="editor-loot-table-list">
      <div
        class="item"
        @click="selectedLootTable = num"
        :class="{ selected: selectedLootTable == num }"
        v-for="(table, num) in curLootTables"
        :key="Math.random()"
      >
        <button class="eui button delete" @click="curLootTables.splice(num, 1)">
          <svg style="width: 16px; height: 16px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
        <div class="name">#{{ num }}</div>
        <div class="weight">{{ $t('editor.weight') }}: {{ table.weight }}</div>
        <div class="count">{{ table.maxCount }}/{{ table.rewards.length }}</div>
      </div>
      <button class="eui button add" @click="addTable">+</button>
    </div>
    <div
      class="editor-loot-table-elements eui form"
      :key="Math.random()"
      v-if="curLootTables[selectedLootTable]"
    >
      <div class="vertical-line">
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.params') }}</label>
          <div class="horizontal-line">
            <div>{{ $t('editor.weight') }}</div>
            <input
              type="number"
              class="eui input"
              min="0"
              max="999"
              step=".05"
              v-model.number="curLootTables[selectedLootTable].weight"
            />
          </div>
          <div class="horizontal-line">
            <div>{{ $t('editor.giveFromPool') }}</div>
            <input
              type="number"
              class="eui input"
              min="1"
              step="1"
              v-model.number="curLootTables[selectedLootTable].maxCount"
            />
          </div>
        </div>
        <label class="eui label">{{ $t('editor.pickups') }}</label>
        <EditorWeightedLinkList
          :links="curLootTables[selectedLootTable].rewards"
          :type="ResourceType.OBJECT"
        />
      </div>
      <div class="vertical-line">
        <label class="eui label">{{ $t('editor.item') }}</label>
        <div class="horizontal-line">
          <div>{{ $t('editor.weight') }}</div>
          <input
            type="number"
            class="eui input"
            min="0"
            max="999"
            step=".05"
            v-model.number="curLootTables[selectedLootTable].itemWeight"
          />
        </div>
        <div class="horizontal-line">
          <div>{{ $t('editor.maxLootTableCount') }}</div>
          <editor-combobox
            :items="itemPools"
            :value="curLootTables[selectedLootTable].itemPool"
            @change="curLootTables[selectedLootTable].itemPool = $event"
            style="min-width: 160px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LootTable } from '@/core/classes/game/LootTable';
import { PropType, reactive, ref } from 'vue';
import EditorWeightedLinkList from './EditorWeightedLinkList.vue';
import EditorCombobox from './EditorCombobox.vue';
import { ResourceType } from '@/core/types/game/ResourceType';
import { ItemPool } from '@/core/types/game/ItemPool';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  lootTable: {
    type: Array as PropType<LootTable[]>,
  },
});

const { t } = useI18n();
const curLootTables = reactive(props.lootTable as LootTable[]);
const selectedLootTable = ref(0);
const itemPools = Object.values(ItemPool).map((type) => ({
  value: type,
  name: t(`game.pools.${type}`),
}));
const addTable = () => {
  curLootTables.push(new LootTable());
};
</script>

<style scoped lang="scss">
.editor-loot-table {
  &-list {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 100px;
      padding: 8px;
      border: solid $editorFg 2px;
      flex-direction: column;
      cursor: pointer;

      &.selected {
        background: #fff59d;
      }

      .name {
        font-weight: bold;
        margin-bottom: 6px;
      }

      .delete {
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
      }
    }

    .add {
      font-size: 28px;
      height: 100px;
    }
  }

  &-elements {
    .horizontal-line {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 0;
    }
  }

  .object-list {
    margin-bottom: 24px;

    .title {
      margin-bottom: 12px;
      text-align: left;
      font-weight: bold;
    }
  }
}
</style>
