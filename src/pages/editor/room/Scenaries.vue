<template>
  <div class="room-editor-scenaries">
    <events-graph :events="room.events" :nodes="nodes" @save="onSave"/>
  </div>
</template>

<script lang="ts">
import { Room } from '@/core/classes/game/Room'
import { useEditorStore } from '@/store/editor';
import { defineComponent, PropType, reactive } from 'vue'

import EventsGraph from '@/components/editor/events/EventsGraph.vue';
import { RoomEvent } from '@/core/classes/game/sub/room/RoomEvent';

export default defineComponent({
  name: 'EditorRoomScenaries',
  emits: ['changeEvents'],
  components: {
    EventsGraph,
  },
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true
    }
  },

  setup(props, { emit }) {
    const editor = useEditorStore();
    const nodes = reactive(editor.eventNodes.get(props.room.id) || new Map());

    const onSave = (ev: {events: RoomEvent[], nodes: Map<string, number[]>}) => {
      emit('changeEvents', ev);
    };

    return {
      nodes,
      onSave,
      emit
    }
  },
})
</script>


<style lang="scss" scoped>
.room-editor-scenaries {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>