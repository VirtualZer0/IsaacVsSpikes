<template>
  <div
    class="res-preview"
    v-html="preview"
    v-if="preview"
    :style="{ height: height + 'px' }"
  />
</template>

<script lang="ts">
import { Resource } from '@/core/classes/base/Resource';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'EditorResPreview',
  props: {
    res: {
      type: Object as PropType<Resource>,
      required: true,
    },
    height: {
      type: Number,
      default: 85,
    },
  },

  async setup(props) {
    const preview = ref('');
    preview.value = await props.res.getPreview();

    return { preview };
  },
});
</script>

<style lang="scss" scoped>
.res-preview {
  :deep(img) {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
