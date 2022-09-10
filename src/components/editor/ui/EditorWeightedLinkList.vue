<template>
  <div class="editor-weighted-link-list">
    <div class="item" v-for="(res, num) in curLinks" :key="num">
      <editor-link
        :res="res"
        :type="type"
        @select="curLinks[num] = { ...$event, weight: 1 }"
        @remove="curLinks.splice(num, 1)"
        :spriteMode="spriteMode"
      />
      <div class="weight">
        <div class="weight-label">{{ $t("editor.weight") }}</div>
        <input
          type="number"
          class="eui input"
          min="0"
          max="1"
          step=".05"
          v-model.number="curLinks[num].weight"
        />
      </div>
    </div>
    <editor-link
      :type="type"
      @select="curLinks.push({ ...$event, weight: 1 })"
      :spriteMode="spriteMode"
    />
  </div>
</template>

<script lang="ts">
import { WeightedResourceLink } from "@/core/classes/base/ResourceLink";
import { WeightedSpriteSource } from "@/core/types/gfx/SpriteSource";
import { defineComponent, PropType, ref } from "vue";
import EditorLink from "./EditorLink.vue";

export default defineComponent({
  name: "EditorLinkList",
  components: {
    EditorLink,
  },
  props: {
    links: {
      type: Array as PropType<WeightedResourceLink[] | WeightedSpriteSource[]>,
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
      ? ref<WeightedSpriteSource | null>(null)
      : ref<WeightedResourceLink | null>(null);

    return {
      curLinks,
      newRes,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-weighted-link-list {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  gap: 12px;

  .item {
    max-width: 230px;
  }

  .weight {
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 12px;

    .input {
      width: calc(100% - 45px);
    }

    &-label {
      width: 45px;
      text-align: left;
    }
  }
}
</style>
