<template>
  <div class="text-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t('editor.textEvent') }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="event.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.startDialog`) }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>
  </div>
</template>

<script lang="ts">
import { RoomTextEvent } from '@/core/classes/game/resources/sub/room/RoomTextEvent';
import { defineComponent, PropType } from 'vue';

import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EventIcon from '../EventIcon.vue';
import EditorTagList from '../../ui/EditorTagList.vue';

export default defineComponent({
  name: 'TextEventEditor',
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorTagList,
  },
  props: {
    event: {
      type: Object as PropType<RoomTextEvent>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.text-event-editor {
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
