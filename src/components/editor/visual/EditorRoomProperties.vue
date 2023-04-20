<template>
  <div class="properties-modal shadow-l2">
    <button class="eui button close" @click="emits('close')">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </button>
    <div class="content">
      <div class="title">{{ $t('editor.entityEdit') }}</div>
      <div class="edit-form" v-if="entity">
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.position') }}</label>
          <div class="sub-line">
            X:
            <input
              class="eui input"
              type="number"
              v-model="entity.position.x"
            />
            Y:
            <input
              class="eui input"
              type="number"
              v-model="entity.position.y"
            />
          </div>
        </div>
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.size') }}</label>
          <div class="sub-line">
            W:
            <input class="eui input" type="number" v-model="entity.width" />
            H:
            <input class="eui input" type="number" v-model="entity.height" />
          </div>
        </div>
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.rotation') }}</label>
          <input class="eui input" type="number" v-model="entity.rotation" />
        </div>
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.zIndex') }}</label>
          <input class="eui input" type="number" v-model="entity.layer" />
        </div>
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.animation') }}</label>
          <EditorCombobox
            v-if="parent"
            :items="(animationList as any) || []"
            :value="entity.animation"
          />
        </div>
        <div class="vertical-line">
          <label class="eui label">{{ $t('editor.saveAspectRatio') }}</label>
          <div class="horizontal-line">
            <EditorCheckbox v-model="entity.saveAspectRatio" />
            <div class="name">{{ $t('editor.enabled') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { EntityInstance } from '@/core/classes/game/sub/gfx/EntityInstance';
import EditorCombobox from '../ui/EditorCombobox.vue';
import { Entity } from '@/core/classes/base/Entity';
import { EntityType } from '@/core/types/game/EntityType';
import { library } from '@/core/Core';
import { ResourceType } from '@/core/types/game/ResourceType';
import { Monster } from '@/core/classes/game/Monster';
import EditorCheckbox from '../ui/EditorCheckbox.vue';

const props = defineProps({
  entity: {
    type: Object as PropType<EntityInstance>,
    required: true,
  },
});

const emits = defineEmits(['close']);
const parent = ref<Entity | null>(null);

if (props.entity.type == EntityType.MONSTER) {
  parent.value = library.getResourceById<Monster>(
    props.entity.srcId,
    ResourceType.MONSTER
  ) as Monster;
} else {
  parent.value = library.getResourceById<Entity>(
    props.entity.srcId,
    ResourceType.OBJECT
  ) as Entity;
}

const animationList = parent.value?.animations.map((anim) => ({
  name: anim.name,
  value: anim.name,
}));
</script>
<style lang="scss" scoped>
.properties-modal {
  position: absolute;
  overflow: auto;
  width: 50%;
  height: 80%;
  max-height: 80%;
  left: 25%;
  top: 10%;
  background: $editorPaper;

  .close {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 12px;
    top: 12px;
    padding: 0;

    &:hover {
      svg {
        fill: $editorBg;
      }
    }
  }

  .content {
    padding: 12px;
    overflow: auto;
    max-height: 100%;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .vertical-line {
    max-width: 100%;
  }

  .horizontal-line {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sub-line {
    align-self: flex-start;

    .input {
      margin-right: 24px;
      width: 190px;
    }
  }
}
</style>
