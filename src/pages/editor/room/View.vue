<template>
  <div class="room-editor-view edit-form">
    <EditorRoomVisual :room="curRoom" />
  </div>
</template>

<script lang="ts">
import EditorRoomVisual from '@/components/editor/visual/EditorRoomVisual.vue';
import { Room } from '@/core/classes/game/Room';
import { defineComponent, PropType, reactive } from 'vue';

export default defineComponent({
  components: { EditorRoomVisual },
  name: 'EditorRoomGeneral',
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curRoom = reactive(props.room);

    return {
      curRoom,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.room-editor-view {
  width: 100%;
  min-height: 100%;
  height: 1px;
  padding: 0;
}
</style>
