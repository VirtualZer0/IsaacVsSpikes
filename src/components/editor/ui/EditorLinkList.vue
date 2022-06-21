<template>
  <div class="editor-link-list">
    <editor-link v-for="(res, num) in curLinks" :key="res.id" :res="res" :type="type" @select="curLinks[num] = $event" @remove="curLinks.splice(num, 1)"/>
    <editor-link :type="type" @select="curLinks.push($event)"/>
  </div>
</template>

<script lang="ts">
import { ResourceLink } from "@/core/classes/base/ResourceLink";
import { defineComponent, PropType, reactive, ref } from "vue";
import EditorLink from "./EditorLink.vue";

export default defineComponent({
  name: 'EditorLinkList',
  components: {
    EditorLink
  },
  props: {
    links: {
      type: Array as PropType<ResourceLink[]>,
      required: false,
      default: () => []
    },
    type: {
      type: String,
      required: true
    }
  },

  setup(props, {emit}) {

    const curLinks = ref(props.links);
    const newRes = ref<ResourceLink | null>(null);

    return {
      curLinks, newRes
    }
  }
})

</script>

<style lang="scss" scoped>



.editor-link-list {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  gap: 12px;
}
</style>