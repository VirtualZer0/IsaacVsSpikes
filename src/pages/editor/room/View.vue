<template>
  <div class="room-editor-general edit-form"></div>
</template>

<script lang="ts">
import { Room } from "@/core/classes/game/Room";
import { defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  components: {},
  name: "EditorRoomGeneral",
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

<style lang="scss" scoped></style>
