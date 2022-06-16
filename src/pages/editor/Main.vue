<template>
  <main class="screen editor-screen" :key="(editor.isOpen as any)">
    <editor-sidebar class="editor-sidebar"/>
    <Suspense>
      <!-- STUB: Временный обход бага vue-i18n: https://github.com/intlify/vue-i18n-next/issues/601 -->
      <div style="width: 100%; height: 100vh">
        <router-view class="editor-child" :key="route.path.split('/')[3]"/>
      </div>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts">
import '../../assets/styles/editorui.scss'
import { defineComponent } from 'vue'
import {useRoute} from 'vue-router'
import EditorSidebar from '@/components/editor/EditorSidebar.vue'
import { useEditorStore } from '@/store/editor'

export default defineComponent({
  name: 'EditorScreen',
  components: {
    EditorSidebar
  },

  setup() {
    const route = useRoute();
    const editor = useEditorStore();
    return { route, editor }
  }
})
</script>


<style lang="scss" scoped>

.editor-screen {

  background-color:#269;
  background-image: linear-gradient(white 2px, transparent 2px),
  linear-gradient(90deg, white 2px, transparent 2px),
  linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px);
  background-size: 5vw 5vw, 5vw 5vw, 1vw 1vw, 1vw 1vw;
  background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;

  display: flex;
  gap: 1vw;

}

.editor-child, .editor-menu {
  padding: 16px;
}

.editor-sidebar {
  position: sticky;
  align-self: flex-start;
  top: 0;
}
</style>