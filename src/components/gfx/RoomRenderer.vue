<template>
  <div class="room" :ref="elements.room">
    <div
      class="inner"
      :ref="elements.inner"
      :style="style"
      @mousemove.passive="mouseMove"
      @mouseup="
        scalableEntity = null;
        rotatableEntity = null;
      "
      @click.right.prevent="showContextMenu = false"
      @click.prevent="showContextMenu = false"
      contextmenu="room-visual-menu"
    >
      <EntityRenderer
        v-for="entity in scene.entities"
        :key="entity.id"
        :entity="entity"
        :scale="scalingFactor"
        :editMode="editMode"
        :editActive="movableEntity?.id == entity.id"
        @setMovableEntity="
          movableEntity?.id == entity.id && !scalableEntity
            ? (movableEntity = null)
            : (movableEntity = entity)
        "
        @setRotatableEntity="
          rotatableEntity = entity;
          rotatableEntityStart = entity.rotation;
        "
        @setScalableEntity="
          scalableEntity = entity;
          scalableMode = $event;
        "
        @removeScalableEntity="scalableEntity = null"
        @showContextMenu="openContextMenu(entity)"
      />
      <img
        class="smartgrid"
        v-if="showGrid"
        lazy
        src="/img/editor/smartgrid.png"
      />
    </div>

    <EditorRoomContextMenu
      v-bind="contextMenuPos"
      v-if="showContextMenu"
      @remove="removeContextEntity"
      @duplicate="duplicateContextEntity"
      @toForward="moveToForward"
      @toBack="moveToBack"
      @properties="showProperties"
    />
  </div>
</template>

<script lang="ts" setup>
import { Room } from '../../core/classes/game/resources/Room';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
} from 'vue';
import { library } from '@/core/Core';
import { Level } from '@/core/classes/game/resources/Level';
import { ResourceType } from '@/core/types/game/ResourceType';
import { fitAspectRatio } from '@/core/utils/fitAspectRatio';
import EntityRenderer from './EntityRenderer.vue';
import { EntityInstance } from '@/core/classes/game/resources/sub/gfx/EntityInstance';
import { RoomScene } from '@/core/classes/game/resources/sub/room/RoomScene';
import { v4 as uuid } from 'uuid';
import EditorRoomContextMenu from '../editor/visual/EditorRoomContextMenu.vue';
import { restoreClass } from '@/core/utils/restoreClass';
import { getCellScale, getNearestSmartGridCell } from '@/core/utils/smartGrid';
/** Компонент для отрисовки комнаты */

const props = defineProps({
  room: {
    type: Object as PropType<Room>,
    required: true,
  },
  scene: {
    type: Object as PropType<RoomScene>,
    required: true,
  },
  editMode: {
    type: Boolean,
    required: false,
    default: false,
  },
  showGrid: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['mousemove', 'selectEntity']);

const curRoom = reactive(props.room);
const scalingFactor = ref(1);

const elements = {
  room: ref<HTMLElement | null>(null),
  inner: ref<HTMLElement | null>(null),
};

const style = reactive({
  backgroundImage: ref('/assets/gfx/null.png'),
  width: 'inherit',
  height: 'inherit',
});

// Mouse move handler
const mousePos = reactive({ x: 0, y: 0 });
const realMousePos = reactive({ x: 0, y: 0 });
const movableEntity = ref<EntityInstance | null>(null);

const rotatableEntity = ref<EntityInstance | null>(null);
const rotatableEntityStart = ref(0);

const scalableEntity = ref<EntityInstance | null>(null);
const scalableMode = ref('x');

const mouseMove = (e: MouseEvent) => {
  if (!props.editMode) return;

  const target = (e.currentTarget as HTMLElement).getBoundingClientRect();
  realMousePos.x = e.pageX - target.left;
  realMousePos.y = e.pageY - target.top;
  mousePos.x = realMousePos.x * scalingFactor.value;
  mousePos.y = realMousePos.y * scalingFactor.value;

  if (movableEntity.value) {
    if (props.showGrid) {
      const prevScale = getCellScale(
        movableEntity.value.y + movableEntity.value.height
      );
      const nearest = getNearestSmartGridCell(mousePos.x, mousePos.y - 10);

      if (nearest.scale != prevScale) {
        movableEntity.value.height =
          (movableEntity.value.height / prevScale) * nearest.scale;
        movableEntity.value.width =
          (movableEntity.value.width / prevScale) * nearest.scale;
      }

      movableEntity.value.x = Math.round(
        nearest.x - movableEntity.value.width / 2
      );
      movableEntity.value.y = Math.round(
        nearest.y - movableEntity.value.height
      );
    } else {
      movableEntity.value.x = Math.round(
        mousePos.x - movableEntity.value.width / 2
      );
      movableEntity.value.y = Math.round(
        mousePos.y - movableEntity.value.height / 2
      );
    }
  }

  if (rotatableEntity.value) {
    rotatableEntity.value.rotation =
      rotatableEntityStart.value +
      Math.atan2(
        mousePos.x -
          (rotatableEntity.value.x + rotatableEntity.value.width / 2),
        -(
          mousePos.y -
          (rotatableEntity.value.y + rotatableEntity.value.height / 2)
        )
      ) *
        (180 / Math.PI);
  }

  if (scalableEntity.value) {
    if (scalableMode.value.includes('x')) {
      scalableEntity.value.width = Math.round(
        mousePos.x - scalableEntity.value.x - 10
      );
    }

    if (scalableMode.value.includes('y')) {
      scalableEntity.value.height = Math.round(
        mousePos.y - scalableEntity.value.y - 15
      );
    }
  }

  emits('mousemove', mousePos);
};

// Context menu
const contextMenuPos = ref({ x: 0, y: 0 });
const showContextMenu = ref(false);
const contextMenuEntity = ref<EntityInstance | null>(null);

const showProperties = () => {
  showContextMenu.value = false;
  emits('selectEntity', contextMenuEntity.value);
};

const openContextMenu = (entity: EntityInstance) => {
  const menuPos = { ...realMousePos };

  if (mousePos.x + 125 * scalingFactor.value > 1920) {
    menuPos.x -= 125;
  }

  if (mousePos.y + 175 * scalingFactor.value > 1080) {
    menuPos.y -= 175;
  }

  contextMenuPos.value = menuPos;
  showContextMenu.value = true;
  contextMenuEntity.value = entity;
};

const removeContextEntity = () => {
  showContextMenu.value = false;

  props.scene.entities = props.scene.entities.filter(
    (entity) => entity.id != contextMenuEntity.value?.id
  );
};

const duplicateContextEntity = () => {
  if (!contextMenuEntity.value) {
    return;
  }

  showContextMenu.value = false;

  const newEntity: EntityInstance = restoreClass<EntityInstance>(
    JSON.parse(JSON.stringify(contextMenuEntity.value)),
    EntityInstance
  );
  newEntity.id = uuid();
  newEntity.x += 15;
  newEntity.y += 15;

  props.scene.entities.push(newEntity);
};

// Layers
const minLayer = computed(() => {
  return Math.min(...props.scene.entities.map((entity) => entity.layer));
});

const maxLayer = computed(() => {
  return Math.max(...props.scene.entities.map((entity) => entity.layer));
});

const moveToForward = () => {
  if (!contextMenuEntity.value) {
    return;
  }

  contextMenuEntity.value.layer = maxLayer.value + 1;
  showContextMenu.value = false;
};

const moveToBack = () => {
  if (!contextMenuEntity.value) {
    return;
  }

  contextMenuEntity.value.layer = minLayer.value - 1;
  showContextMenu.value = false;
};

const setRoomBg = async () => {
  let selectedBg = null;
  if (curRoom.background.length > 0) {
    selectedBg =
      curRoom.background[Math.floor(Math.random() * curRoom.background.length)];
  } else if (curRoom.level?.id) {
    const lvl = library.getResourceById<Level>(
      curRoom.level.id,
      ResourceType.LEVEL
    );
    if (lvl?.sprites[curRoom.type] && lvl.sprites[curRoom.type].length > 0) {
      selectedBg =
        lvl.sprites[curRoom.type][
          Math.floor(Math.random() * lvl.sprites[curRoom.type].length)
        ];
    }
  }

  if (typeof selectedBg?.src === 'string') {
    style.backgroundImage = `url('${selectedBg}')`;
  } else if (selectedBg?.src?.id) {
    style.backgroundImage = `url('${await library.getAssetURL(
      selectedBg.src.id
    )}')`;
  }
};

const setInnerSize = () => {
  requestAnimationFrame(() => {
    const roomEl = elements.room.value;
    const targetWidth = roomEl?.clientWidth ?? 1920;
    const targetHeight = roomEl?.clientHeight ?? 1080;
    const res = fitAspectRatio(1920, 1080, targetWidth, targetHeight);
    style.width = `${res.width}px`;
    style.height = `${res.height}px`;
    scalingFactor.value = res.scalingFactor;
  });
};

const resizeObserver = new ResizeObserver(setInnerSize);

onMounted(() => {
  resizeObserver.observe(elements.room.value as HTMLElement);
  setInnerSize();
});

onBeforeUnmount(() => {
  resizeObserver.disconnect();
});

await setRoomBg();
</script>

<style lang="scss" scoped>
.room {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.inner {
  backface-visibility: hidden;
  transform: translateZ(0);
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  max-width: inherit;
  max-height: 100%;

  .smartgrid {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
