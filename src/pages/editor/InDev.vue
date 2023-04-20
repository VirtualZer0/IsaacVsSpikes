<template>
  <div class="editor editor-indev">
    <div class="eui card shadow-l2">
      <div class="title">{{ $t('editor.indev') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditorInDevScreen',
});
</script>

<style lang="scss" scoped>
.editor-indev {
  @include center;
  flex-grow: 1;
  height: 100%;
}

.card {
  height: 250px;
  width: 40%;
  @include center;

  background: repeating-linear-gradient(
    45deg,
    #333,
    #333 10px,
    #ffeb3b 10px,
    #ffeb3b 20px
  );

  .title {
    font-weight: bold;
    font-size: 32px;
    height: 218px;
    width: calc(100% - 32px);
    background: $editorBg;
    @include center;
  }
}
</style>
