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
        :type="ResourceType.ASSET"
        :asset-type="AssetType.SFX"
        @select="curEvent.sound = $event"
        @remove="curEvent.sound = null"
      />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.switchScene`) }}</label>
      <editor-combobox
        :items="scenes"
        :value="curEvent.switchScene"
        @change="curEvent.switchScene = $event"
      />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.copyFromScene`) }}</label>
      <editor-combobox
        :items="scenes"
        :value="curEvent.copyFromScene"
        @change="curEvent.copyFromScene = $event"
      />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.removeObjectsWithTags`) }}</label>
      <editor-tag-list :tags="curEvent.removeObjectsWithTags" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EventIcon from '../EventIcon.vue';
import { RoomEffectEvent } from '@/core/classes/game/sub/room/RoomEffectEvent';
import EditorLink from '../../ui/EditorLink.vue';
import { ResourceType } from '@/core/types/game/ResourceType';
import { AssetType } from '@/core/types/game/AssetType';
import { Room } from '@/core/classes/game/Room';
import EditorCombobox from '../../ui/EditorCombobox.vue';
import EditorTagList from '../../ui/EditorTagList.vue';

export default defineComponent({
  name: 'EffectEventEditor',
  components: {
    EditorLocaleInput,
    EventIcon,
    EditorLink,
    EditorCombobox,
    EditorTagList,
  },
  props: {
    event: {
      type: Object as PropType<RoomEffectEvent>,
      required: true,
    },
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  setup(props) {
    const curEvent = ref(props.event);
    const scenes = [
      { name: 'None', value: '' },
      ...props.room.scenes.map((scene) => ({
        name: scene.getDisplayName(),
        value: scene.id,
      })),
    ];
    return {
      curEvent,
      ResourceType,
      AssetType,
      scenes,
    };
  },
});
</script>

<style lang="scss" scoped>
.effect-event-editor {
  min-height: 100%;
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
