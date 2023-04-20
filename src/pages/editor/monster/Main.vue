<template>
  <div class="screen editor editor-monster">
    <editor-resource-top
      type="monster"
      :res="monster"
      @save="saveMonster"
      @cancel="router.push('/editor/list/monsters')"
    />

    <editor-resource-menu
      :items="[
        { name: 'editor.general', value: 'general' },
        { name: 'editor.view', value: 'view' },
      ]"
      @select="switchMenu"
    />

    <router-view :monster="monster" class="eui paper content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditorStore } from '@/store/editor';
import { Monster } from '@/core/classes/game/Monster';
import { v4 as uuid } from 'uuid';
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/utils/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue';
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  name: 'EditorMonster',
  components: {
    EditorResourceTop,
    EditorResourceMenu,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let monster: Monster;

    if (route.params.id == 'new') {
      monster = new Monster();
      monster.id = uuid();
      await editor.createResource(ResourceType.MONSTER, monster);
      await router.replace(`/editor/monsters/${monster.id}`);
    }

    monster = reactiveCopy<Monster>(
      editor.monsters.get(route.params.id as string),
      new Monster()
    );

    const saveMonster = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource(ResourceType.MONSTER, monster);
      }

      router.push(`/editor/list/monsters`);
    };

    const switchMenu = (item: { name: string; value: string }) => {
      router.push(`/editor/monsters/${monster.id}/${item.value}`);
    };

    return {
      editor,
      monster,
      store,
      router,
      saveMonster,
      switchMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-monster {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
}

.content {
  flex-grow: 1;
}
</style>
