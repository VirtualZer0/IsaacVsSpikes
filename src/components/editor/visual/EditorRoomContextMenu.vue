<template>
  <menu
    type="context"
    class="editor-room-context-menu"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
  >
    <div class="menu-item" @click="emits('remove')">
      {{ $t('editor.remove') }}
    </div>
    <div class="menu-item" @click="emits('duplicate')">
      {{ $t('editor.duplicate') }}
    </div>
    <div class="menu-item" @click="emits('toBack')">
      {{ $t('editor.toBack') }}
    </div>
    <div class="menu-item" @click="emits('toForward')">
      {{ $t('editor.toForward') }}
    </div>
    <div class="menu-item" @click="emits('properties')">
      {{ $t('editor.properties') }}
    </div>
  </menu>
</template>
<script lang="ts" setup>
const emits = defineEmits([
  'remove',
  'duplicate',
  'toBack',
  'toForward',
  'properties',
]);

defineProps({
  x: {
    type: Number,
    default: 0,
    required: true,
  },
  y: {
    type: Number,
    default: 0,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.editor-room-context-menu {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background: $editorPaper;
  text-align: left;

  .menu-item {
    padding: 8px 8px;
    cursor: pointer;
    transition: background-color 0.1s linear;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    &:hover {
      background: $editorAccent;
    }
  }
}
</style>
