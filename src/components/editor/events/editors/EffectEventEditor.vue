<template>
  <div class="effect-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t('editor.effectEvent') }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.sound`) }}</label>
      <editor-link
        :res="curEvent.sound"
        type="assets"
        @select="curEvent.sound = $event"
        @remove="curEvent.sound = null"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EventIcon from '../EventIcon.vue';
import { RoomEffectEvent } from '@/core/classes/game/sub/room/RoomEffectEvent';
import EditorLink from '../../ui/EditorLink.vue';

export default defineComponent({
  name: 'EffectEventEditor',
  components: {
    EditorLocaleInput,
    EventIcon,
    EditorLink,
  },
  props: {
    event: {
      type: Object as PropType<RoomEffectEvent>,
      required: true,
    },
  },
  setup(props) {
    const curEvent = ref(props.event);
    return {
      curEvent,
    };
  },
});
</script>

<style lang="scss" scoped>
.effect-event-editor {
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
