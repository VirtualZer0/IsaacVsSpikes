<template>
  <div class="screen editor editor-object">
    <editor-resource-top
      type="object"
      :res="entityObject"
      @save="saveEntityObject"
      @cancel="router.push('/editor/list/objects')"
    />

    <editor-resource-menu
      :items="[
        { name: 'editor.general', value: 'general' },
        { name: 'editor.view', value: 'view' },
        { name: 'editor.params', value: 'params' },
      ]"
      @select="switchMenu"
    />

    <router-view :entityObject="entityObject" class="eui paper content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditorStore } from '@/store/editor';
import { EntityObject } from '@/core/classes/game/EntityObject';
import { v4 as uuid } from 'uuid';
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/utils/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue';
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  name: 'EditorEntityObject',
  components: {
    EditorResourceTop,
    EditorResourceMenu,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let entityObject: EntityObject;

    if (route.params.id == 'new') {
      entityObject = new EntityObject();
      entityObject.id = uuid();
      await editor.createResource(ResourceType.OBJECT, entityObject);
      await router.replace(`/editor/objects/${entityObject.id}`);
    }

    entityObject = reactiveCopy<EntityObject>(
      editor.objects.get(route.params.id as string),
      new EntityObject()
    );

    const saveEntityObject = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource(ResourceType.OBJECT, entityObject);
      }

      router.push(`/editor/list/objects`);
    };

    const switchMenu = (item: { name: string; value: string }) => {
      router.push(`/editor/objects/${entityObject.id}/${item.value}`);
    };

    return {
      editor,
      entityObject,
      store,
      router,
      saveEntityObject,
      switchMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-object {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
}

.content {
  flex-grow: 1;
}
</style>
