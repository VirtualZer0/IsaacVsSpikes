<template>
  <div class="eui paper resource-menu">
    <button
      v-for="(item, index) in items"
      :key="index"
      class="item"
      :class="{ active: index == selected }"
      @click="select(index)"
    >
      {{ $t(item.name) }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "EditorResourceMenu",
  emits: ["select"],
  props: {
    items: {
      type: Array as PropType<{ name: string; value: string }[]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selected = ref(0);

    const select = (index: number) => {
      selected.value = index;
      emit("select", props.items[index]);
    };

    emit("select", props.items[selected.value]);

    return {
      selected,
      select,
    };
  },
});
</script>

<style lang="scss">
.resource-menu {
  display: flex;
  justify-content: stretch;

  .item {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    color: $editorFg;
    transition: background-color 0.2s ease;
    border: none;
    cursor: pointer;

    &:hover {
      background: lighten($editorGray, 25%);
    }

    &.active {
      background: $editorFg;
      color: $editorBg;
    }
  }
}
</style>
