<template>
  <div
    class="entity"
    :style="{
      left: `${entity.x / scale}px`,
      top: `${entity.y / scale}px`,
      zIndex: entity.layer,
    }"
  >
    <Sprite
      :style="{
        transform: `rotate(${entity.rotation}deg)`,
      }"
      :animation="
        entityData?.animations.find((anim) => anim.name === entity.animation)
      "
      :width="curEntity.width / scale"
      :height="curEntity.height / scale"
      :saveAspect="curEntity.saveAspectRatio"
      class="entity-sprite"
    />
    <div
      v-if="editMode"
      class="edit-frame"
      :class="{ active: editActive }"
      @mousedown.left="emits('setMovableEntity')"
      @click.right.stop.prevent="emits('showContextMenu')"
    >
      <div
        class="horizontal point"
        @mousedown.prevent.stop="emits('setScalableEntity', 'x')"
      />
      <div
        class="both point"
        @mousedown.prevent.stop="emits('setScalableEntity', 'xy')"
      />
      <div
        class="vertical point"
        @mousedown.prevent.stop="emits('setScalableEntity', 'y')"
      />
      <div
        class="rotation point"
        @mousedown.prevent.stop="emits('setRotatableEntity')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { EntityInstance } from '@/core/classes/game/sub/gfx/EntityInstance';
import { library } from '@/core/Core';
import { EntityType } from '@/core/types/game/EntityType';
import { Entity } from '@/core/classes/base/Entity';
import { ResourceType } from '@/core/types/game/ResourceType';
import { PropType, reactive } from 'vue';
import Sprite from './Sprite.vue';

const props = defineProps({
  entity: {
    type: Object as PropType<EntityInstance>,
    required: true,
  },

  scale: {
    type: Number,
    default: 1,
  },

  editMode: {
    type: Boolean,
    default: false,
  },

  editActive: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  'setMovableEntity',
  'setRotatableEntity',
  'setScalableEntity',
  'removeScalableEntity',
  'showContextMenu',
]);

const curEntity = reactive(props.entity);

const entityData = library.getResourceById<Entity>(
  props.entity.srcId,
  props.entity.type == EntityType.MONSTER
    ? ResourceType.MONSTER
    : ResourceType.OBJECT
);
</script>
<style lang="scss" scoped>
.entity {
  position: fixed;

  .edit-frame {
    position: absolute;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border: 1px solid #000;
    top: -10px;
    left: -10px;
    cursor: move;

    .point {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #000;
      border-radius: 100%;
      outline: 1px #fff solid;
    }

    &.active {
      border-color: red;

      .point {
        display: none;
      }
    }

    .horizontal {
      top: calc(50% - 5px);
      right: -5px;
      cursor: ew-resize;
    }

    .vertical {
      bottom: -5px;
      right: calc(50% - 5px);
      cursor: ns-resize;
    }

    .both {
      bottom: -5px;
      right: -5px;
      cursor: nwse-resize;
    }

    .rotation {
      right: calc(50% - 5px);
      top: -24px;
      cursor: crosshair;

      &::before {
        position: absolute;
        content: '';
        height: 24px;
        left: 4.5px;
        border-left: 1px solid #000;
      }
    }
  }
}
</style>
