<template>
  <div
    class="editor-filedrop"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragenter="dropReady = true"
    @dragleave="dropReady = false"
  >
    <div class="block" v-if="!dropReady">
      <svg style="width: 128px; height: 128px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,12L16,16H13.5V19H10.5V16H8L12,12Z"
        />
      </svg>
      <div class="text">{{ $t("editor.dropFile") }}</div>
      <div class="text">{{ $t("editor.or") }}</div>
      <button class="eui button text" @click="openFileDialog">
        {{ $t("editor.selectFile") }}
      </button>
    </div>

    <div class="block" v-else>
      <svg style="width: 128px; height: 128px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.5,11L17.88,16.37L17,16.55L16.36,16.67C15.73,16.8 15.37,17.5 15.65,18.07L15.92,18.65L17.28,21.59L15.86,22.25L14.5,19.32L14.24,18.74C13.97,18.15 13.22,17.97 12.72,18.38L12.21,18.78L11.5,19.35V11M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10"
        />
      </svg>
      <div class="text">{{ $t("editor.dropFileOver") }}</div>
    </div>

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="onFileSelect"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "EditorFileDrop",
  emits: ["select"],
  setup(_props, { emit }) {
    const dropReady = ref(false);
    const fileInput = ref<Nullable<HTMLInputElement>>(null);

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer && e.dataTransfer.files.length) {
        emit("select", e.dataTransfer.files[0]);
      }

      dropReady.value = false;
    };

    const onFileSelect = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length) {
        emit("select", files[0]);
      }
    };

    const openFileDialog = () => {
      fileInput.value?.click();
    };

    return {
      dropReady,
      fileInput,
      onDragOver,
      onDrop,
      openFileDialog,
      onFileSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
.editor-filedrop {
  width: 100%;
  min-height: 100%;
  @include center;
  border: 5px dashed $editorFg;
}

.text {
  font-size: 24px;
  margin-bottom: 8px;
}

.button {
  display: inline-block;
}
</style>
