<template>
  <div class="screen editor editor-doorDesc">

    <editor-resource-top type="doorDesc" :res="doorDesc" @save="saveDoorDesc" @cancel="router.push('/editor/list/doorDescs')" />

    <editor-resource-menu :items="[
      {name: 'editor.general', value: 'general'},
    ]" @select="switchMenu" />

    <router-view :doorDesc="doorDesc" class="eui paper content" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useEditorStore} from '@/store/editor'
import { DoorDesc } from '@/core/classes/game/DoorDesc';
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
    let doorDesc: DoorDesc;


    if (route.params.id == 'new') {
      doorDesc = new DoorDesc();
      doorDesc.id = uuid()
      await editor.createResource('doorDescs', doorDesc);
      await router.replace(`/editor/doorDescs/${doorDesc.id}`);
    }

    doorDesc = reactiveCopy<DoorDesc>(
      editor.doorDescs.get(route.params.id as string),
      new DoorDesc()
    );

    const saveDoorDesc = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource('doorDescs', doorDesc);
      }

      router.push(`/editor/list/doorDescs`);
    }

    const switchMenu = (item: {name: string, value: string}) => {
      router.push(`/editor/doorDescs/${doorDesc.id}/${item.value}`);
    }

    return {
      editor, doorDesc, store, router,
      saveDoorDesc, switchMenu
    }
  },
})
</script>


<style lang="scss" scoped>
.editor-doorDesc {
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