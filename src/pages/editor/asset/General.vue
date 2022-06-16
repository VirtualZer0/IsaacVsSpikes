<template>
  <div class="asset-editor-general eui edit-form">
    <div class="preview">
      <Suspense>
        <template #default>
          <editor-res-preview :res="curAsset" :height="240" />
        </template>
        <template #fallback>
          <svg style="width:24px;height:24px" class="preview-loader" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </template>
      </Suspense>
    </div>
    <div class="line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="curAsset.name" />
    </div>
    <div class="line">
      <label class="eui label">{{$t(`editor.exportFolder`)}}</label>
      <input class="eui input" autocomplete="on" name="exportFolder" v-model="curAsset.exportFolder" />
    </div>
    <div class="line">
      <label class="eui label">{{$t(`editor.exportName`)}}</label>
        <input class="eui input" autocomplete="on" name="exportFile" v-model="curAsset.exportName" />
        .{{curAsset.extension}}
    </div>
  </div>
</template>

<script lang="ts">
import EditorResPreview from '@/components/editor/ui/EditorResPreview.vue';
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import { Asset } from '@/core/classes/game/Asset'
import { defineComponent, PropType, ref } from 'vue'
import { restoreClass } from '@/core/helpers/restoreClass';
import { FSAccessFile } from '@/utils/uniFS/FSAccess/FSAccessFile';

export default defineComponent({
  components: { EditorLocaleInput, EditorResPreview },
  name: 'EditorAssetGeneral',
  emits: ['changeName'],
  props: {
    asset: {
      type: Object as PropType<Asset>,
      required: true
    }
  },

  setup(props, { emit }) {

    const curAsset = ref(props.asset);
    if (curAsset.value.file) {
      curAsset.value.file = restoreClass(curAsset.value.file, FSAccessFile);
    }

    return {
      emit, curAsset
    }
  },
})
</script>

<style lang="scss" scoped>
.preview {
  border: 2px solid $editorFg;
  width: auto;
  margin-bottom: 16px;
}
</style>