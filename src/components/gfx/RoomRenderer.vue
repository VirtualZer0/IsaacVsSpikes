<template>
  <div class="room">

  </div>
</template>

<script lang="ts">
import { Room } from '../../core/classes/game/Room'
import { defineComponent, PropType } from 'vue'

/** Компонент для отрисовки комнаты */
export default defineComponent({
  name: 'RoomRenderer',
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
    editMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>


<style>

</style>