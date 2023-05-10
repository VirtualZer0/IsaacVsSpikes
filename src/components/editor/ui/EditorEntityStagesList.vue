<template>
  <div class="editor-entity-stage-list">
    <div
      class="editor-entity-stage-list-item"
      v-for="(anim, num) in animOrder"
      :key="num"
    >
      <div class="animation-name">{{ anim?.name || '[REMOVED]' }}</div>
      <Sprite :animation="anim" :width="64" :height="64" relative />
      <div
        class="eui button editor-entity-stage-list-item-remove"
        @click.stop="eData.destructStages.splice(num, 1)"
      >
        <svg style="width: 16px; height: 16px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
    </div>

    <div class="editor-entity-stage-list-anim-selector">
      <EditorCombobox
        :items="animations"
        :value="selectedAnim"
        @change="selectedAnim = $event"
        class="anim-selector-combobox"
      />
      <div class="eui button editor-entity-stage-list-add" @click="addStage()">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue';
import Sprite from '@/components/gfx/Sprite.vue';
import { EntityObject } from '@/core/classes/game/EntityObject';
import { IEntityObjectData } from '@/core/classes/game/sub/entityObject/IEntityObjectData';
import { computed } from '@vue/reactivity';
import EditorCombobox from './EditorCombobox.vue';

const props = defineProps({
  entity: {
    type: Object as PropType<EntityObject>,
    required: true,
  },
});

const curEntity = ref(props.entity);

const eData = curEntity.value.entityData as IEntityObjectData;
const animOrder = computed(() =>
  eData.destructStages.map((st) =>
    curEntity.value.animations.find((anim) => anim.id == st)
  )
);

const animations = computed(() =>
  curEntity.value.animations.map((anim) => ({
    name: anim.name,
    value: anim.id,
  }))
);

const selectedAnim = ref<string | undefined>(animations.value[0].value);

const addStage = () => {
  if (selectedAnim.value) {
    eData.destructStages.push(selectedAnim.value);
  }
};
</script>
<style lang="scss" scoped>
.editor-entity-stage-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  &-item {
    position: relative;
    padding: 6px;
    border: 2px solid $editorFg;
    width: 140px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    .button {
      background: $editorBg;
    }

    &.active {
      background: $editorFg;
      color: $editorBg;
    }

    &-remove {
      position: absolute;
      padding: 0;
      right: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border-right: none;
      border-top: none;

      &:hover {
        background: #f44336;
      }
    }

    .animation-name {
      margin-bottom: 8px;
    }
  }

  &-add {
    width: 32px;
    height: 32px;
    padding: 0;
  }

  &-anim-selector {
    display: flex;
    gap: 8px;
  }

  .anim-selector-combobox {
    min-width: 120px;
  }
}
</style>
