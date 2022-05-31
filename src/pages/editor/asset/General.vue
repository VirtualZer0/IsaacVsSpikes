<template>
  <div class="asset-editor-general eui edit-form">
    <div class="line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="asset.name"/>
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import { Asset } from '@/core/classes/game/Asset'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  components: { EditorLocaleInput },
  name: 'EditorAssetGeneral',
  emits: ['changeName'],
  props: {
    asset: {
      type: Object as PropType<Asset>,
      required: true
    }
  },

  setup(props, { emit }) {
    return {
      emit
    }
  },
})
</script>

<style lang="scss" scoped>
</style>