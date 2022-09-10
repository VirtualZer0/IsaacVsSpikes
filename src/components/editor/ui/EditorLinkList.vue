<template>
  <div class="editor-link-list">
    <editor-link
      v-for="(res, num) in curLinks"
      :key="num"
      :res="res"
      :type="type"
      @select="curLinks[num] = $event"
      @remove="curLinks.splice(num, 1)"
      :spriteMode="spriteMode"
    />
    <editor-link
      :type="type"
      @select="curLinks.push($event)"
      :spriteMode="spriteMode"
    />
  </div>
</template>

<script lang="ts">
import { ResourceLink } from "@/core/classes/base/ResourceLink";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { defineComponent, PropType, reactive, ref } from "vue";
import EditorLink from "./EditorLink.vue";

export default defineComponent({
  name: "EditorLinkList",
  components: {
    EditorLink,
  },
  props: {
    links: {
      type: Array as PropType<ResourceLink[] | SpriteSource[]>,
      required: false,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
    spriteMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const curLinks = ref(props.links);
    const newRes = props.spriteMode
      ? ref<SpriteSource | null>(null)
      : ref<ResourceLink | null>(null);

    return {
      curLinks,
      newRes,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-link-list {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  gap: 12px;
}
</style>
