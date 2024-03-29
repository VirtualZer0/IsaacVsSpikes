<template>
  <div class="editor editor-resources-list" :class="{ modal: modal }">
    <div class="eui paper">
      <div class="top">
        <div class="title">{{ $t(`editor.${resource}`) }}</div>
        <div class="search">
          <svg style="width: 32px; height: 32px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
          <input type="text" class="eui input simple" v-model="filter" />
        </div>
      </div>

      <!-- Встроенные ресурсы -->
      <div
        class="eui items builtin"
        v-if="includeBuiltin && (library as any)[resource] && (library as any)[resource].length > 0"
      >
        <div class="group">
          <div class="group-title">{{ $t('editor.builtin') }}</div>
        </div>
        <div
          class="eui card shadow-l1 item"
          v-for="[id,res] in (library as any)[resource]"
          :key="id"
          @click="emit('select', res)"
          :title="res.tags.join(', ')"
        >
          <Suspense>
            <template #default>
              <editor-res-preview :res="res" class="preview" />
            </template>
            <template #fallback>
              <svg
                style="width: 24px; height: 24px"
                class="preview-loader"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                />
              </svg>
            </template>
          </Suspense>
          <div class="name">{{ res.getDisplayName(store.currentLocale) }}</div>
          <div class="uuid">{{ res.id }}</div>
        </div>
      </div>

      <!-- Пользовательские ресурсы -->
      <div class="eui items">
        <div class="group" v-if="includeBuiltin">
          <div class="group-title">{{ $t('editor.custom') }}</div>
        </div>
        <div
          class="eui card shadow-l1 item"
          v-for="[id, res] in filteredItems"
          :key="id"
          @click="
            selectMode
              ? emit('select', res)
              : router.push(`/editor/${resource}/${id}`)
          "
          :title="`${res.tags.join(', ')}\n${res.note}`"
        >
          <Suspense>
            <template #default>
              <editor-res-preview :res="res" class="preview" />
            </template>
            <template #fallback>
              <svg
                style="width: 24px; height: 24px"
                class="preview-loader"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                />
              </svg>
            </template>
          </Suspense>
          <div class="name">{{ res.getDisplayName(store.currentLocale) }}</div>
          <div class="uuid">{{ res.id }}</div>

          <div class="item-controls" v-if="!selectMode">
            <div
              class="control duplicate"
              :title="$t('editor.copyResource')"
              @click.stop="duplicateResource(res)"
              v-if="resource != 'assets'"
            >
              <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                />
              </svg>
            </div>

            <div
              class="control delete"
              :title="$t('editor.deleteResource')"
              @click.stop="deleteResource(res)"
            >
              <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <router-link
          class="eui item new"
          :to="`/editor/${resource}/new`"
          v-if="!selectMode"
        >
          <svg style="width: 64px; height: 64px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, PropType } from 'vue';
import { useEditorStore } from '@/store/editor';
import { useRoute, useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { Resource } from '@/core/classes/base/Resource';
import { v4 as uuid } from 'uuid';
import { useMainStore } from '@/store/main';
import { Asset } from '@/core/classes/game/resources/Asset';
import { restoreClass } from '@/core/utils/restoreClass';
import { Level } from '@/core/classes/game/resources/Level';
import { Room } from '@/core/classes/game/resources/Room';
import { Item } from '@/core/classes/game/resources/Item';

import EditorResPreview from '@/components/editor/ui/EditorResPreview.vue';

import { library } from '@/core/Core';
import { restoreEvents } from '@/core/utils/restoreEvents';
import { ResourceType } from '@/core/types/game/ResourceType';
import { ResourceCollectionType } from '@/core/types/game/ResourceCollectionType';
import { EntityInstance } from '@/core/classes/game/resources/sub/gfx/EntityInstance';
import { RoomScene } from '@/core/classes/game/resources/sub/room/RoomScene';
import { AssetType } from '@/core/types/game/AssetType';

export default defineComponent({
  name: 'EditorResourcesListScreen',
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
    includeBuiltin: {
      type: Boolean,
      default: false,
    },
    resourceType: {
      type: String as PropType<ResourceType>,
      default: '',
    },
    assetType: {
      type: String as PropType<AssetType>,
      default: null,
    },
  },
  components: {
    EditorResPreview,
  },
  emits: ['select'],
  setup(props, { emit }) {
    const editor = useEditorStore();
    const store = useMainStore();
    const route = useRoute();
    const router = useRouter();
    const resource: ResourceType =
      props.resourceType || (route.params.resource as ResourceType);
    const items = computed(() =>
      resource == ResourceType.ASSET
        ? library.getAssetsByType(
            props.assetType,
            ResourceCollectionType.CUSTOM
          )
        : library.getResourcesByType<Resource>(
            resource,
            ResourceCollectionType.CUSTOM
          )
    );
    const filter = ref('');

    const duplicateResource = async (res: Resource) => {
      let duplicatedItem = JSON.parse(JSON.stringify(res));
      duplicatedItem.id = uuid();

      // Восстановление класса копии
      switch (resource) {
        case ResourceType.LEVEL:
          duplicatedItem = restoreClass<Level>(duplicatedItem, Level);
          break;
        case ResourceType.ROOM: {
          // Для комнаты дополнительно копируем ноды и энтити
          duplicatedItem = restoreClass<Room>(duplicatedItem, Room);
          duplicatedItem.events = restoreEvents(duplicatedItem.events);
          duplicatedItem.scenes = duplicatedItem.scenes.map(
            (scene: RoomScene) => {
              const curScene = restoreClass<RoomScene>(scene, RoomScene);
              curScene.entities = curScene.entities.map((entity) =>
                restoreClass<EntityInstance>(entity, EntityInstance)
              );
              return curScene;
            }
          );
          break;
        }
        case ResourceType.ITEM:
          duplicatedItem = restoreClass<Item>(duplicatedItem, Item);
          break;
        case ResourceType.ASSET:
          duplicatedItem = restoreClass<Asset>(duplicatedItem, Asset);
          break;
        default:
          duplicatedItem = restoreClass<Resource>(duplicatedItem, Resource);
          break;
      }

      await editor.createResource(resource, duplicatedItem);
    };

    const deleteResource = async (res: Resource) => {
      if (resource != 'assets') {
        await editor.deleteResource(resource, res.id);
      } else {
        await editor.deleteAsset(res as Asset);
      }
    };

    const filteredItems = computed(() => {
      let filtered: Map<string, Resource> = new Map();

      if (filter.value) {
        for (const [id, res] of items.value) {
          res.isMatch(filter.value) && filtered.set(id, res);
        }
      } else {
        filtered = items.value;
      }

      return new Map(
        [...filtered.entries()].sort((a, b) =>
          a[1]
            .getDisplayName(store.currentLocale)
            .localeCompare(b[1].getDisplayName(store.currentLocale))
        )
      );
    });

    return {
      editor,
      store,
      filteredItems,
      resource,
      router,
      filter,
      library,
      duplicateResource,
      deleteResource,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-resources-list {
  @include center;
  flex-grow: 1;
  height: 100%;

  &.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}

.paper {
  height: 100%;
  width: calc(100% - 32px);
  padding: 24px;
  overflow: auto;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .title {
    font-size: 24px;
  }

  .search {
    @include center;

    svg {
      margin-right: 12px;
    }
  }
}

.items {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.group {
  margin-top: 24px;
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-variant: small-caps;

  &-title {
    width: 60%;
    padding-bottom: 8px;
    border-bottom: 2px solid $editorFg;
  }
}

.item {
  @include center;
  flex-direction: column;
  padding: 6px;
  width: 230px;
  height: 140px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 18px;
  color: $editorFg;

  .preview {
    width: 100%;
    max-height: 85px;
    margin-bottom: 4px;
    overflow: hidden;
  }

  .preview-loader {
    animation: spin 1s linear infinite;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .name {
    word-wrap: break-word;
    max-width: 100%;
    text-align: center;
  }

  &-controls {
    display: none;

    .control {
      @include center;
      transition: all 0.25s ease;
      border: 1px solid $editorFg;
      width: 24px;
      height: 24px;

      &:hover {
        background-color: $editorFg;
        color: $editorBg;
      }
    }
  }

  &.new {
    border: 3px $editorFg dashed;

    &:hover {
      background: $editorFg;
      color: $editorBg;
    }
  }

  &:hover:not(.new) {
    transform: scale(1.1);
    @extend .shadow-l2;

    .item-controls {
      position: absolute;
      right: 8px;
      top: 8px;
      display: flex;
      gap: 4px;
    }
  }

  .uuid {
    color: $editorGray;
    font-size: 11px;
  }
}
</style>
