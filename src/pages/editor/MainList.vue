<template>
  <div class="screen editor editor-main-list">
    <div class="eui paper">
      <div class="eui items">
        <router-link to="/editor/list/levels" class="eui card item shadow-l1">{{$t('editor.levels')}} <span class="count">{{editor.levels.size}}</span></router-link>
        <router-link to="/editor/list/rooms" class="eui card item shadow-l1">{{$t('editor.rooms')}} <span class="count">{{editor.rooms.size}}</span></router-link>
        <router-link to="/editor/list/monsters" class="eui card item shadow-l1">{{$t('editor.monsters')}} <span class="count">{{editor.monsters.size}}</span></router-link>
        <div class="eui card item shadow-l1">{{$t('editor.bosses')}} <span class="count">0</span></div>
        <div class="eui card item shadow-l1">{{$t('editor.objects')}} <span class="count">0</span></div>
        <div class="eui card item shadow-l1">{{$t('editor.items')}} <span class="count">0</span></div>
        <div class="eui card item shadow-l1">{{$t('editor.characters')}} <span class="count">0</span></div>
        <router-link to="/editor/list/assets" class="eui card item shadow-l1">{{$t('editor.assets')}} <span class="count">{{editor.assets.size}}</span></router-link>
        <div class="eui card item shadow-l1">{{$t('editor.scripts')}} <span class="count">0</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from '@/store/editor';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditorMainListScreen',
  setup() {
    const editor = useEditorStore();

    return {
      editor
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-main-list {

  @include center;
  flex-grow: 1;
  height: 100%;

}
.paper {
  height: 100%;
  width: calc(100% - 48px);
  padding: 24px;
}

.items {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.item {
  @include center;
  flex-direction: column-reverse;
  padding: 16px;
  width: 180px;
  height: 140px;
  cursor: pointer;
  transition: all .25s ease;
  font-size: 21px;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    @extend .shadow-l2;
  }

  .count {
    font-weight: 600;
    font-size: 48px;
    margin-bottom: 12px;
  }
}
</style>