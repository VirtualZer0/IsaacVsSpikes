<template>
  <div class="eui top paper">
    <div class="title">
      {{ $t(`editor.${type}`) }} {{ res?.getDisplayName(store.currentLocale) }}
      <span class="uuid">{{ res ? res.id : "" }}</span>
    </div>
    <editor-resource-controls
      @save="emit('save')"
      @cancel="emit('cancel')"
      :disable-save="!res"
    />
  </div>
</template>

<script lang="ts">
import { Resource } from "@/core/classes/base/Resource";
import { useMainStore } from "@/store/main";
import { defineComponent, PropType } from "vue";
import EditorResourceControls from "./EditorResourceControls.vue";

/** Отображает верхнюю строку в редакторе ресурса */
export default defineComponent({
  name: "EditorResourceTop",
  emits: ["save", "cancel"],
  components: {
    EditorResourceControls,
  },
  props: {
    res: {
      type: Object as PropType<Nullable<Resource>>,
      required: false,
      default: null,
    },

    type: {
      type: String,
      required: false,
      default: "resource",
    },
  },

  setup(_props, { emit }) {
    const store = useMainStore();
    return {
      store,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
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
}
</style>
