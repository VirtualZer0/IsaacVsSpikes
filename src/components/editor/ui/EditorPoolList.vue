<template>
  <div class="editor-pool-list">
    <div
      class="editor-pool-list-item"
      v-for="(pool, index) in curPools"
      :key="index"
      :style="{ backgroundColor: getColor(pool) }"
    >
      <div class="editor-pool-list-item-name">
        {{ $t(`game.pools.${pool}`) }}
      </div>
      <div
        class="eui button editor-pool-list-item-remove"
        @click="curPools.splice(index, 1)"
      >
        <svg style="width: 16px; height: 16px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
    </div>
    <div class="editor-pool-list-new">
      <EditorCombobox
        :items="pools"
        :value="newPool"
        @change="newPool = $event"
        class="combobox"
      />
      <button class="eui button" @click="addPool()">
        <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import seedrandom from 'seedrandom';
import { useI18n } from 'vue-i18n';
import { ItemPool } from '@/core/types/game/ItemPool';
import EditorCombobox from './EditorCombobox.vue';

export default defineComponent({
  name: 'EditorPoolList',
  props: {
    pools: {
      type: Array as PropType<ItemPool[]>,
      required: false,
      default: () => [],
    },
  },
  setup(props) {
    const curPools = ref(props.pools);
    const newPool = ref(ItemPool.DEFAULT);
    const { t } = useI18n();

    const pools = Object.values(ItemPool).map((p) => ({
      name: t(`game.pools.${p}`),
      value: p,
    }));

    const getColor = (pool: ItemPool) => {
      const rng = seedrandom(pool);
      const h = rng() * 360;
      const s = 0.5;
      const l = 0.8;
      return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
    };
    const addPool = () => {
      if (!curPools.value.includes(newPool.value) && newPool.value.length > 0) {
        curPools.value.push(newPool.value);
      }
      newPool.value = ItemPool.DEFAULT;
    };
    return {
      curPools,
      newPool,
      getColor,
      addPool,
      pools,
    };
  },
  components: { EditorCombobox },
});
</script>

<style lang="scss" scoped>
.editor-pool-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 0;
  gap: 16px;

  &-new {
    display: flex;
    gap: 12px;

    input {
      width: 140px;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: $editorBgInvariant;
    padding: 6px;

    &-remove {
      padding: 0;
    }
  }

  .combobox {
    min-width: 160px;
  }
}
</style>
