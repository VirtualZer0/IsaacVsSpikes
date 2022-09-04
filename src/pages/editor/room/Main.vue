<template>
  <div class="screen editor editor-room">

    <editor-resource-top
      type="room"
      :res="room"
      @save="saveRoom"
      @cancel="router.push('/editor/list/rooms')"/>

    <editor-resource-menu
      :items="[
        {name: 'editor.general', value: 'general'},
        {name: 'editor.view', value: 'view'},
        {name: 'editor.scenaries', value: 'scenaries'},
      ]"
      @select="switchMenu"/>

    <router-view :room="room" class="eui paper content" />

  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useEditorStore} from '@/store/editor'
import { Room } from '@/core/classes/game/Room';
import {v4 as uuid} from 'uuid'
import { useMainStore } from '@/store/main';
import reactiveCopy from '@/core/helpers/reactiveCopy';

import EditorResourceTop from '@/components/editor/EditorResourceTop.vue'
import EditorResourceMenu from '@/components/editor/EditorResourceMenu.vue'
import { RoomEvent } from '@/core/classes/game/sub/room/RoomEvent';
import { restoreEvents } from '@/core/helpers/restoreEvents';

export default defineComponent({
  name: 'EditorRoom',
  components: {
    EditorResourceTop,
    EditorResourceMenu
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const editor = useEditorStore();
    const store = useMainStore();
    let room: Room;

    if (route.params.id == 'new') {
      room = new Room();
      room.id = uuid()
      await editor.createResource('rooms', room);
      await router.replace(`/editor/rooms/${room.id}`);
    }

    room = reactiveCopy<Room>(
      editor.rooms.get(route.params.id as string),
      new Room()
    );

    room.events = restoreEvents(room.events);

    const saveRoom = async () => {
      if (route.params.id != 'new') {
        await editor.updateResource('rooms', room);
      }

      router.push(`/editor/list/rooms`);
    }

    const switchMenu = (item: {name: string, value: string}) => {
      router.push(`/editor/rooms/${room.id}/${item.value}`);
    }

    return {
      editor, room, store, router,
      saveRoom, switchMenu
    }
  },
})
</script>


<style lang="scss" scoped>

.editor-room {
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