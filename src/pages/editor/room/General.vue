<template>
  <div class="room-editor-general eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="room.name"/>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.description`)}}</label>
      <editor-locale-multi-text class="input" :text="room.desc"/>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.doorDescription`)}}</label>
      <editor-locale-text class="input" :text="room.doorDesc"/>
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import { Room } from '@/core/classes/game/Room'
import { defineComponent, PropType, reactive } from 'vue'

export default defineComponent({
  components: { EditorLocaleInput, EditorLocaleText, EditorLocaleMultiText },
  name: 'EditorRoomGeneral',
  emits: ['changeName'],
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true
    }
  },

  setup(props, { emit }) {
    return {
      emit
    }
  },
})
</script>


<style lang="scss" scoped>
</style>