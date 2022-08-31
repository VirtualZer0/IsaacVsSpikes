<template>
  <div class="room-editor-general edit-form">
    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="room.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.type`)}}</label>
      <editor-combobox :items="roomTypes" :value="curRoom.type" @change="curRoom.type = $event"/>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.tags`)}}</label>
      <editor-tag-list :tags="room.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.level`)}}</label>
      <editor-link type="levels" :res="curRoom.level" @select="curRoom.level = $event" @remove="curRoom.level = null" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.weight`)}}</label>
      <input type="number" class="eui input small" v-model.number="curRoom.weight" min="0" step=".1" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.description`)}}</label>
      <editor-locale-multi-text class="input" :text="room.desc" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.doorDescs`)}}</label>
      <editor-weighted-link-list :links="room.doorDescs" type="doorDescs"/>
    </div>

    <div class="room-split">
      <div class="vertical-line">
        <label class="eui label">{{$t(`editor.background`)}}</label>
        <editor-link-list type="assets" :links="curRoom.background" spriteMode />
      </div>
      <div class="vertical-split" />
      <div class="vertical-line">
        <label class="eui label">{{$t(`editor.overlay`)}}</label>
        <editor-link-list type="assets" :links="curRoom.overlay" spriteMode />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import { Room } from '@/core/classes/game/Room'
import { computed, defineComponent, PropType, reactive } from 'vue'
import EditorLinkList from '@/components/editor/ui/EditorLinkList.vue';
import EditorLink from '@/components/editor/ui/EditorLink.vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';
import EditorCombobox from '@/components/editor/ui/EditorCombobox.vue';
import { RoomType } from '@/core/classes/game/sub/room/RoomType';
import i18n from '@/i18n';
import EditorWeightedLinkList from '@/components/editor/ui/EditorWeightedLinkList.vue';

export default defineComponent({
  components: { EditorLocaleInput, EditorLocaleMultiText, EditorLinkList, EditorLink, EditorTagList, EditorCombobox, EditorWeightedLinkList },
  name: 'EditorRoomGeneral',
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true
    }
  },

  setup(props, { emit }) {
    const { t } = i18n.global;
    const curRoom = reactive(props.room);
    const roomTypes = computed(() => {

      const types: {name: string, value: string}[] = [];
      Object.values(RoomType).forEach(type => {
        types.push({
          value: type,
          name: t(`game.${type}Room`)
        })
      })
      return types;
    })

    return {
      curRoom,
      roomTypes,
      emit
    }
  },
})
</script>


<style lang="scss" scoped>

.input.small {
  width: 100px;
}

.room-split {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  .vertical-line {
    width: auto;
    max-width: 33%;
  }

  .vertical-split {
    width: 3px;
    height: 120px;
    background-color: $editorFg;
  }
}
</style>