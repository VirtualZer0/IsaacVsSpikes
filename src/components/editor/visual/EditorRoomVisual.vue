<template>
  <div class="editor-room-visual">
    <RoomRenderer
      v-if="curScene"
      :room="curRoom"
      :scene="curScene"
      :editMode="showGizmo"
      :showGrid="showGrid"
      @mousemove="mousePos = $event"
      @selectEntity="selectedEntity = $event"
    />
    <EditorRoomEntityList
      class="editor-entity-list"
      @selectEntity="addEntity"
    />
    <div class="coords">
      X: {{ mousePos.x.toFixed(2) }} | Y: {{ mousePos.y.toFixed(2) }}
    </div>
    <div class="tools">
      <div
        class="eui circleButton"
        @click="showGizmo = !showGizmo"
        :class="showGizmo ? 'active' : 'inactive'"
        :title="$t('editor.toggleGizmo')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            v-if="showGizmo"
            d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
          />
          <path
            v-else
            d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"
          />
        </svg>
      </div>

      <div
        class="eui circleButton"
        :title="$t('editor.scenesMenu')"
        @click="showScenes = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M21 16V6H7V16H21M21 4C21.53 4 22.04 4.21 22.41 4.59C22.79 4.96 23 5.47 23 6V16C23 16.53 22.79 17.04 22.41 17.41C22.04 17.79 21.53 18 21 18H7C5.89 18 5 17.1 5 16V6C5 4.89 5.89 4 7 4H21M3 20H18V22H3C2.47 22 1.96 21.79 1.59 21.41C1.21 21.04 1 20.53 1 20V9H3V20Z"
          />
        </svg>
      </div>

      <div
        class="eui circleButton"
        @click="showGrid = !showGrid"
        :class="showGrid ? 'active' : 'inactive'"
        :title="$t('editor.toggleGrid')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            v-if="showGrid"
            d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z"
          />
          <path
            v-else
            d="M0,2.77L1.28,1.5L22.5,22.72L21.23,24L19.23,22H4C2.92,22 2,21.1 2,20V4.77L0,2.77M10,4V7.68L8,5.68V4H6.32L4.32,2H20A2,2 0 0,1 22,4V19.7L20,17.7V16H18.32L16.32,14H20V10H16V13.68L14,11.68V10H12.32L10.32,8H14V4H10M16,4V8H20V4H16M16,20H17.23L16,18.77V20M4,8H5.23L4,6.77V8M10,14H11.23L10,12.77V14M14,20V16.77L13.23,16H10V20H14M8,20V16H4V20H8M8,14V10.77L7.23,10H4V14H8Z"
          />
        </svg>
      </div>
    </div>

    <EditorRoomScenes
      :show="showScenes"
      :room="curRoom"
      :activeSceneId="selectedScene"
      @close="showScenes = false"
      @select="selectedScene = $event"
    />

    <EditorRoomProperties
      v-if="selectedEntity != null"
      :entity="(selectedEntity as EntityInstance)"
      @close="selectedEntity = null"
    />
  </div>
</template>
<script lang="ts" setup>
import RoomRenderer from '@/components/gfx/RoomRenderer.vue';
import { Entity } from '@/core/classes/base/Entity';
import { Room } from '@/core/classes/game/resources/Room';
import { PropType, reactive, ref, watch } from 'vue';
import EditorRoomEntityList from './EditorRoomEntityList.vue';
import { EntityInstance } from '@/core/classes/game/resources/sub/gfx/EntityInstance';
import { RoomScene } from '@/core/classes/game/resources/sub/room/RoomScene';
import EditorRoomScenes from './EditorRoomScenes.vue';
import { computed } from 'vue';
import EditorRoomProperties from './EditorRoomProperties.vue';
import { ResourceLink } from '@/core/classes/base/ResourceLink';

const props = defineProps({
  room: {
    type: Object as PropType<Room>,
    required: true,
  },
});

const showGizmo = ref(true);
const showScenes = ref(false);
const showGrid = ref(false);
const curRoom = reactive(props.room);

const selectedScene = ref(curRoom.scenes[0].id);
const curScene = computed(() =>
  curRoom.scenes.find((scene) => scene.id == selectedScene.value)
);
const mousePos = ref({ x: 0, y: 0 });

const selectedEntity = ref<EntityInstance | null>(null);

const addEntity = (entity: Entity) => {
  const instance = new EntityInstance();
  instance.setSource(entity);
  instance.x = 200;
  instance.y = 200;
  instance.animation = entity.animations[0]?.id;

  if (entity.animations[0]?.metadata?.width) {
    instance.width =
      entity.animations[0]?.metadata?.width / entity.animations[0].count;
  } else {
    instance.width = 64;
  }

  instance.height = entity.animations[0]?.metadata?.height ?? 64;
  (curScene.value as RoomScene).entities.push(instance);
};
</script>
<style lang="scss" scoped>
.editor-room-visual {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.editor-entity-list {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.coords {
  width: auto;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  pointer-events: none;
  font-size: 14px;
}

.tools {
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 6px;
  background: $editorBg;
  border-radius: 100px;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  .circleButton {
    background: $editorAccent;
    width: 32px;
    height: 32px;

    &.active {
      background: #4caf50;
    }

    &.inactive {
      background: #f44336;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
