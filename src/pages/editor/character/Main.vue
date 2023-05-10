<template>
  <div class="screen editor editor-character">
    <editor-resource-top
      type="character"
      :res="character"
      @save="saveCharacter"
      @cancel="router.push('/editor/list/characters')"
    />

    <editor-resource-menu
      :items="[
        { name: 'editor.general', value: 'general' },
        { name: 'editor.view', value: 'view' },
        { name: 'editor.params', value: 'params' },
      ]"
      @select="switchMenu"
    />

    <router-view :character="character" class="eui paper content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditorStore } from '@/store/editor';
import { Character } from '@/core/classes/game/Character';
import { v4 as uuid } from 'uuid';
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/utils/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue';
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue';
import { ResourceType } from '@/core/types/game/ResourceType';

export default defineComponent({
  name: 'EditorCharacter',
  components: {
    EditorResourceTop,
    EditorResourceMenu,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let character: Character;

    if (route.params.id == 'new') {
      character = new Character();
      character.id = uuid();
      await editor.createResource(ResourceType.CHARACTER, character);
      await router.replace(`/editor/characters/${character.id}`);
    }

    character = reactiveCopy<Character>(
      editor.characters.get(route.params.id as string),
      new Character()
    );

    const saveCharacter = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource(ResourceType.CHARACTER, character);
      }

      router.push(`/editor/list/characters`);
    };

    const switchMenu = (el: { name: string; value: string }) => {
      router.push(`/editor/characters/${character.id}/${el.value}`);
    };

    return {
      editor,
      character,
      store,
      router,
      saveCharacter,
      switchMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-character {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
}

.content {
  flex-grow: 1;
}
</style>
