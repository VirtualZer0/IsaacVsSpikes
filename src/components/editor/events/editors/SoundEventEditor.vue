<template>
  <div class="sound-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{$t('editor.soundEvent')}}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.sound`)}}</label>
      <editor-link :res="curEvent.sound" type="assets" @select="curEvent.sound = $event"
        @remove="curEvent.sound = null" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import EditorLocaleInput from "../../ui/EditorLocaleInput.vue";
import EventIcon from "../EventIcon.vue";
import { RoomSoundEvent } from "@/core/classes/game/sub/room/RoomSoundEvent";
import EditorLink from "../../ui/EditorLink.vue";

export default defineComponent({
  name: "SoundEventEditor",
  components: {
    EditorLocaleInput,
    EventIcon,
    EditorLink
},
  props: {
    event: {
      type: Object as PropType<RoomSoundEvent>,
      required: true
    }
  },
  setup(props) {
    const curEvent = ref(props.event);
    return {
      curEvent
    };
  }
});
</script>

<style lang="scss" scoped>
.sound-event-editor {
  .title {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 16px;
    @include center;

    .icon {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }
  }
}
</style>