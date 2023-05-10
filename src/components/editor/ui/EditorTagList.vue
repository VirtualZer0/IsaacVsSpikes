<template>
  <div class="editor-tag-list">
    <div
      class="editor-tag-list-item"
      v-for="(tag, index) in curTags"
      :key="index"
      :style="{ backgroundColor: getColor(tag) }"
    >
      <div class="editor-tag-list-item-name">{{ tag }}</div>
      <div
        class="eui button editor-tag-list-item-remove"
        @click="curTags.splice(index, 1)"
      >
        <svg style="width: 16px; height: 16px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
    </div>
    <div class="editor-tag-list-new">
      <input
        type="text"
        class="eui input"
        v-model="newTag"
        @keypress.enter="addTag()"
      />
      <button class="eui button" @click="addTag()">
        <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import seedrandom from 'seedrandom';

export default defineComponent({
  name: 'EditorTagList',
  props: {
    tags: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  },

  setup(props) {
    const curTags = ref(props.tags);
    const newTag = ref('');

    const getColor = (tag: string) => {
      const rng = seedrandom(tag);
      const h = rng() * 360;
      const s = 0.5;
      const l = 0.8;
      return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
    };

    const addTag = () => {
      if (!curTags.value.includes(newTag.value) && newTag.value.length > 0) {
        curTags.value.push(newTag.value.toLowerCase());
      }
      newTag.value = '';
    };

    return {
      curTags,
      newTag,
      getColor,
      addTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-tag-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 0;
  gap: 16px;

  &-new {
    display: flex;
    gap: 12px;

    input {
      width: 140px;
      min-width: 120px;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: $editorBgInvariant;
    padding: 6px;

    &-remove {
      padding: 0;
    }
  }
}
</style>
