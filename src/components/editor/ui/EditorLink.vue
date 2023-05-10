<template>
  <div
    class="editor-link"
    :class="{ selected: res != null }"
    @click="showModal = true"
  >
    <teleport to="body" v-if="showModal">
      <editor-modal :title="$t(`editor.${type}`)" @close="showModal = false">
        <resources-list
          :resourceType="type"
          :assetType="assetType"
          include-builtin
          select-mode
          @select="selectResource"
        />
      </editor-modal>
    </teleport>
    <svg style="width: 64px; height: 64px" viewBox="0 0 24 24" v-if="!res">
      <path
        fill="currentColor"
        d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
      />
    </svg>
    <editor-res-preview
      :res="resource"
      v-if="res && resource"
      class="preview"
      :height="80"
    />
    <div
      class="name"
      v-if="res"
      :title="resource?.getDisplayName() || 'Broken link'"
    >
      {{ resource?.getDisplayName() || 'Broken link' }}
    </div>
    <div class="uuid" v-if="res">
      {{ resource?.id || 'Resource not found' }}
    </div>
    <button class="eui button remove" v-if="res" @click.stop="emit('remove')">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M2,5.27L3.28,4L20,20.72L18.73,22L13.9,17.17L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L12.5,15.76L10.88,14.15C10.87,14.39 10.77,14.64 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C8.12,13.77 7.63,12.37 7.72,11L2,5.27M12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.79,8.97L9.38,7.55L12.71,4.22M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.2,10.54 16.61,12.5 16.06,14.23L14.28,12.46C14.23,11.78 13.94,11.11 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Resource } from '@/core/classes/base/Resource';
import { defineComponent, PropType, ref, computed } from 'vue';

import ResourcesList from '@/pages/editor/ResourcesList.vue';
import EditorModal from './EditorModal.vue';
import { ResourceLink } from '@/core/classes/base/ResourceLink';
import EditorResPreview from './EditorResPreview.vue';
import { useEditorStore } from '@/store/editor';
import { library } from '@/core/Core';
import { SpriteSource } from '@/core/types/gfx/SpriteSource';
import { Asset } from '@/core/classes/game/Asset';
import { ResourceType } from '@/core/types/game/ResourceType';
import { AssetType } from '@/core/types/game/AssetType';

export default defineComponent({
  name: 'EditorLink',
  emits: ['select', 'remove'],
  components: {
    ResourcesList,
    EditorModal,
    EditorResPreview,
  },
  props: {
    res: {
      type: Object as PropType<ResourceLink | SpriteSource | null>,
      required: false,
      default: null,
    },
    type: {
      type: String as PropType<ResourceType>,
      required: true,
    },
    assetType: {
      type: String as PropType<AssetType>,
      default: null,
    },
    spriteMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const editor = useEditorStore();

    const showModal = ref(false);

    const resource = computed(() => {
      const propRes = props.spriteMode
        ? ((props.res as SpriteSource).src as ResourceLink)
        : (props.res as ResourceLink);

      if (!propRes) {
        return null;
      }

      const res = (editor as any)[props.type]?.get(propRes.id);

      if (!res) {
        return (library as any)[props.type]?.get(propRes.id);
      }

      return res;
    });

    const selectResource = (resource: Resource | null) => {
      if (resource) {
        let output = null;

        if (props.spriteMode) {
          const asset = resource as Asset;
          output = {
            src: {
              type: props.type,
              id: asset.id,
            },
            metadata: asset.metadata,
          } as SpriteSource;
        } else {
          output = {
            type: props.type,
            id: resource.id,
            metadata: (resource as any).metadata,
          };
        }
        emit('select', output);
      } else {
        emit('remove');
      }

      showModal.value = false;
    };

    return {
      showModal,
      resource,
      selectResource,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-link {
  @include center;
  position: relative;
  flex-direction: column;
  padding: 2px;
  width: 230px;
  height: 140px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 18px;
  color: $editorFg;
  border: 2px solid $editorFg;

  .name {
    word-wrap: break-word;
    white-space: nowrap;
    max-width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 6px;
    text-align: center;
  }

  .uuid {
    color: $editorGray;
    font-size: 11px;
  }

  &:not(.selected) {
    border: 3px $editorFg dashed;

    &:hover {
      background: $editorFg;
      color: $editorBg;
    }
  }

  &.selected {
    &:hover {
      .remove {
        opacity: 1;
      }
    }
  }

  .remove {
    opacity: 0;
    position: absolute;
    right: 8px;
    top: 8px;
    width: 24px;
    height: 24px;
    padding: 0;
    background: $editorBg;

    &:hover {
      background: $editorFg;
      color: $editorBg;
    }
  }
}
</style>
