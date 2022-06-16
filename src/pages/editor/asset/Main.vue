<template>
  <div class="screen editor editor-asset">

    <editor-resource-top
      type="asset"
      :res="asset"
      @save="saveAsset"
      @cancel="router.push('/editor/list/assets')"/>

    <div class="eui paper content">
      <editor-file-drop v-if="!asset" @select="createAsset"/>
      <editor-asset-general v-else :asset="asset" @save="saveAsset"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import {useRoute, useRouter} from 'vue-router'
import {useEditorStore} from '@/store/editor'
import { Asset } from '@/core/classes/game/Asset';
import {v4 as uuid} from 'uuid'
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/helpers/reactiveCopy';
import { restoreClass } from '@/core/helpers/restoreClass';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue'
import EditorFileDrop from '@/components/editor/ui/EditorFileDrop.vue';
import EditorAssetGeneral from '@/pages/editor/asset/General.vue';
import { FSAccessFile } from '@/utils/uniFS/FSAccess/FSAccessFile';

export default defineComponent({
  name: 'EditorAsset',
  components: {
    EditorResourceTop,
    EditorFileDrop,
    EditorAssetGeneral
},
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();

    const asset = ref(
      route.params.id != 'new' ? reactiveCopy<Asset>(
      editor.assets.get(route.params.id as string),
      new Asset()
    ) : null);

    const createAsset = async (ev: File) => {
      if (!editor.fs) {
        return;
      }
      asset.value = await Asset.create(ev, editor.fs);
      await editor.saveAsset(asset.value);

      await router.replace(`/editor/assets/${asset.value.id}`);
    }

    const saveAsset = async () => {
      if (route.params.id != 'new' && asset) {
        editor.$patch(() => {
          if (!asset.value) {
            return;
          }

          // Восстановление классов ассета и файла
          const restoredAsset = restoreClass<Asset>(asset.value, Asset);
          if (restoredAsset.file) {
            restoredAsset.file = restoreClass<FSAccessFile>(restoredAsset.file, FSAccessFile);
          }
          editor.assets.set(asset.value.id, restoredAsset);
        });
      }

      router.push(`/editor/list/assets`);
    }

    return {
      editor, asset, store, router,
      saveAsset, createAsset
    }
  },
})
</script>

<style lang="scss" scoped>
.editor-asset {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 21px;

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .uuid {
    font-size: 12px;
    color: $editorGray;
  }

  .controls {
    display: flex;
    gap: 4px;
  }
}

.content {
  display: flex;
  height: 100%;
  flex-grow: 1;
  padding: 16px;
}
</style>