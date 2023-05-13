<template>
  <div class="scenes-modal shadow-l2" v-if="show">
    <button class="eui button close" @click="emits('close')">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </button>
    <div class="content">
      <div class="scenes">
        <div
          class="scene card shadow-l1"
          v-for="scene in curRoom.scenes"
          :key="scene.id"
          @click="emits('select', scene.id)"
          :class="{
            active: scene.id == activeSceneId,
          }"
        >
          <div class="name">{{ scene.getDisplayName() }}</div>
          <div class="uuid">{{ scene.id }}</div>
          <div class="actions">
            <div class="eui button" @click.stop="removeScene(scene.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                />
              </svg>
            </div>
            <div class="eui button" @click.stop="duplicateScene(scene)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="add-scene" @click="addScene">
          <svg style="width: 64px; height: 64px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </div>
      </div>

      <div class="edit-scene">
        <div class="vertical-line">
          <label class="eui label">{{ $t(`editor.name`) }}</label>
          <EditorLocaleInput
            class="input"
            :text="activeScene?.name || {}"
            :key="activeScene?.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Room } from '@/core/classes/game/resources/Room';
import { PropType, computed, reactive } from 'vue';
import EditorLocaleInput from '../ui/EditorLocaleInput.vue';
import { RoomScene } from '@/core/classes/game/resources/sub/room/RoomScene';
import reactiveCopy from '@/core/utils/reactiveCopy';
import { restoreClass } from '@/core/utils/restoreClass';
import { EntityInstance } from '@/core/classes/game/resources/sub/gfx/EntityInstance';
import { v4 as uuid } from 'uuid';

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },

  room: {
    type: Object as PropType<Room>,
    required: true,
  },

  activeSceneId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['close', 'select']);
const curRoom = reactive(props.room);
const activeScene = computed(() =>
  curRoom.scenes.find((scene) => scene.id == props.activeSceneId)
);

const addScene = () => {
  const newScene = new RoomScene();
  newScene.name = {};
  curRoom.scenes.push(newScene);
  emits('select', newScene.id);
};

const removeScene = (sceneId: string) => {
  if (curRoom.scenes.length > 1) {
    if (props.activeSceneId == sceneId) {
      emits('select', curRoom.scenes[0].id);
    }
    curRoom.scenes = curRoom.scenes.filter((scene) => scene.id != sceneId);
  }
};

const duplicateScene = (scene: RoomScene) => {
  const copy = restoreClass<RoomScene>(reactiveCopy(scene), RoomScene);
  copy.id = uuid();
  copy.entities = copy.entities.map((entity) =>
    restoreClass<EntityInstance>(entity, EntityInstance)
  );
  curRoom.scenes.push(copy);
  emits('select', copy.id);
};
</script>
<style lang="scss" scoped>
.scenes-modal {
  position: absolute;
  overflow: auto;
  width: 80%;
  height: 80%;
  max-height: 80%;
  left: 10%;
  top: 10%;
  padding-bottom: 100px;
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

  .edit-scene {
    @include center;
    position: absolute;
    bottom: 0;
    width: calc(100% - 12px);
    .vertical-line {
      width: 60%;
    }
    .label {
      font-size: 16px;
    }
  }

  .scenes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;

    .scene {
      cursor: pointer;
      width: 200px;
      height: 90px;
      @include center;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }

      &.active {
        background: #fff59d;
      }

      .uuid {
        font-size: 9px;
        color: $editorGray;
        margin-top: 4px;
        margin-bottom: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
      }

      .button {
        padding: 2px;
        svg {
          width: 21px;
          height: 21px;
        }

        &:hover {
          svg {
            fill: $editorBg;
          }
        }
      }
    }

    .add-scene {
      cursor: pointer;
      width: 200px;
      height: 90px;
      @include center;
      flex-direction: column;
      transition: all 0.3s ease;
      border: 3px dashed $editorFg;

      &:hover {
        color: $editorBg;
        background: $editorFg;
      }
    }
  }
}
</style>
