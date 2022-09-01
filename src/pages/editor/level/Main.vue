<template>
  <div class="screen editor editor-level">

    <editor-resource-top type="level" :res="level" @save="saveLevel" @cancel="router.push('/editor/list/levels')" />

    <editor-resource-menu :items="[
      {name: 'editor.general', value: 'general'},
      {name: 'editor.view', value: 'view'},
    ]" @select="switchMenu" />

    <router-view :level="level" class="eui paper content" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useEditorStore} from '@/store/editor'
import { Level } from '@/core/classes/game/Level';
import {v4 as uuid} from 'uuid'
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/helpers/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue'
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue'

export default defineComponent({
  name: 'EditorLevel',
  components: {
    EditorResourceTop,
    EditorResourceMenu
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let level: Level;

    if (route.params.id == 'new') {
      level = new Level();
      level.id = uuid()
      await editor.createResource('levels', level);
      await router.replace(`/editor/levels/${level.id}`);
    }

    level = reactiveCopy<Level>(
      editor.levels.get(route.params.id as string),
      new Level()
    );

    const saveLevel = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource('levels', level);
      }

      router.push(`/editor/list/levels`);
    }

    const switchMenu = (item: {name: string, value: string}) => {
      router.push(`/editor/levels/${level.id}/${item.value}`);
    }

    return {
      editor, level, store, router,
      saveLevel, switchMenu
    }
  },
})
</script>


<style lang="scss" scoped>
.editor-level {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  max-height: 100%;
}

.content {
  flex-grow: 1;
}
</style>