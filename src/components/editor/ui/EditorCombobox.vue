<template>
  <div class="editor-combobox">
    <slot />

    <div class="editor-combobox-main" @click="expanded = !expanded">
      <div class="editor-combobox-text">{{ items[selectedIndex].name }}</div>

      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7">
        <path
          fill-rule="evenodd"
          d="M5 6.5a.997.997 0 0 1-.707-.293l-4-4A.999.999 0 1 1 1.707.793l3.305 3.305L8.305.918a1 1 0 0 1 1.39 1.439l-4 3.862A.997.997 0 0 1 5 6.5Z"
          clip-rule="evenodd"
        />
      </svg>

      <div class="editor-combobox-expand shadow-l1" v-show="expanded">
        <div
          class="editor-combobox-item"
          v-for="item in items"
          :key="item.value"
          @click="change(item)"
        >
          {{ item.name ?? item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";

export default defineComponent({
  name: "EditorCombobox",
  emits: ["change"],
  props: {
    items: {
      type: Array as PropType<{ value: string; name: string }[]>,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: 0,
    },
  },

  setup(props, { emit }) {
    const expanded = ref(false);

    const change = (item: { value: string; name: string }) => {
      emit("change", item.value);
    };

    const selectedIndex = computed(() => {
      return props.items.findIndex((item) => item.value == props.value);
    });

    return {
      expanded,
      change,
      selectedIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-combobox {
  display: flex;
  align-items: center;
  cursor: pointer;

  &-main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 220px;
    height: 32px;
    border: 2px solid $editorFg;
    padding: 0 6px;

    svg {
      fill: $editorFg;
    }
  }

  &-expand {
    top: 30px;
    position: absolute;
    width: calc(100% + 4px);
    max-width: 220px;
    background: $editorBg;
    height: 32px;
    left: -2px;
    color: $editorFg;
    overflow: visible;
    height: auto;
    z-index: 100;
  }

  &-item {
    display: flex;
    height: 32px;
    align-items: center;
    padding: 0 6px;
    user-select: none;
    overflow: hidden;

    &:hover {
      background: $editorGray;
      color: $editorBg;
    }
  }
}
</style>
