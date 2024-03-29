<template>
  <div class="screen editor editor-item">
    <editor-resource-top
      type="item"
      :res="item"
      @save="saveItem"
      @cancel="router.push('/editor/list/items')"
    />

    <editor-resource-menu
      :items="[
        { name: 'editor.general', value: 'general' },
        { name: 'editor.view', value: 'view' },
        { name: 'editor.params', value: 'params' },
      ]"
      @select="switchMenu"
    />

    <router-view :item="item" class="eui paper content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditorStore } from '@/store/editor';
import { Item } from '@/core/classes/game/resources/Item';
import { v4 as uuid } from 'uuid';
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/utils/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue';
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  name: 'EditorItem',
  components: {
    EditorResourceTop,
    EditorResourceMenu,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let item: Item;

    if (route.params.id == 'new') {
      item = new Item();
      item.id = uuid();
      await editor.createResource(ResourceType.ITEM, item);
      await router.replace(`/editor/items/${item.id}`);
    }

    item = reactiveCopy<Item>(
      editor.items.get(route.params.id as string),
      new Item()
    );

    const saveItem = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource(ResourceType.ITEM, item);
      }

      router.push(`/editor/list/items`);
    };

    const switchMenu = (el: { name: string; value: string }) => {
      router.push(`/editor/items/${item.id}/${el.value}`);
    };

    return {
      editor,
      item,
      store,
      router,
      saveItem,
      switchMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
}

.content {
  flex-grow: 1;
}
</style>
