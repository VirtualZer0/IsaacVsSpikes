<template>
  <div class="screen editor editor-main-list">
    <div class="eui paper">
      <div class="eui items">
        <router-link to="/editor/list/levels" class="eui card item shadow-l1"
          >{{ $t('editor.levels') }}
          <span class="count">{{ editor.levels.size }}</span></router-link
        >
        <router-link to="/editor/list/rooms" class="eui card item shadow-l1"
          >{{ $t('editor.rooms') }}
          <span class="count">{{ editor.rooms.size }}</span></router-link
        >
        <router-link to="/editor/list/monsters" class="eui card item shadow-l1"
          >{{ $t('editor.monsters') }}
          <span class="count">{{ editor.monsters.size }}</span></router-link
        >
        <router-link to="/editor/list/objects" class="eui card item shadow-l1">
          {{ $t('editor.objects') }}
          <span class="count">{{ editor.objects.size }}</span>
        </router-link>
        <router-link to="/editor/list/items" class="eui card item shadow-l1">
          {{ $t('editor.items') }}
          <span class="count">{{ editor.items.size }}</span>
        </router-link>
        <router-link
          to="/editor/list/characters"
          class="eui card item shadow-l1"
        >
          {{ $t('editor.characters') }}
          <span class="count">{{ editor.characters.size }}</span>
        </router-link>
        <router-link to="/editor/list/assets" class="eui card item shadow-l1"
          >{{ $t('editor.assets') }}
          <span class="count">{{ editor.assets.size }}</span></router-link
        >
        <div class="eui card item shadow-l1">
          {{ $t('editor.scripts') }} <span class="count">0</span>
        </div>
        <router-link to="/editor/list/doorDescs" class="eui card item shadow-l1"
          >{{ $t('editor.doorDescs') }}
          <span class="count">{{ editor.doorDescs.size }}</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from '@/store/editor';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditorMainListScreen',
  setup() {
    const editor = useEditorStore();
    const router = useRouter();

    if (!editor.isOpen) {
      router.push('/editor');
    }

    return {
      editor,
    };
  },
});
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
  justify-content: flex-end;
  padding: 12px;
  width: 180px;
  height: 140px;
  cursor: pointer;
  transition: all 0.25s ease;
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
