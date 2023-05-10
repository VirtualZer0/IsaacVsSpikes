<template>
  <div class="room-editor-scenaries">
    <events-graph :events="room.events" :room="room" />
  </div>
</template>

<script lang="ts">
import { Room } from '@/core/classes/game/Room';
import { defineComponent, PropType } from 'vue';

import EventsGraph from '@/components/editor/events/EventsGraph.vue';

export default defineComponent({
  name: 'EditorRoomScenaries',
  components: {
    EventsGraph,
  },
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.room-editor-scenaries {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
