<template>
  <div class="level-editor-view edit-form">
    <div v-for="roomType in roomTypes" :key="roomType" class="room">
      <div class="title">{{ $t(`game.${roomType}Room`) }}</div>
      <div class="room-split">
        <div class="vertical-line">
          <label class="eui label">{{ $t(`editor.background`) }}</label>
          <editor-link-list
            type="assets"
            :links="level.sprites[roomType]"
            spriteMode
          />
        </div>
        <div class="vertical-split" />
        <div class="vertical-line">
          <label class="eui label">{{ $t(`editor.overlay`) }}</label>
          <editor-link-list
            type="assets"
            :links="level.overlays[roomType]"
            spriteMode
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Level } from "@/core/classes/game/Level";
import { defineComponent, PropType } from "vue";
import EditorLinkList from "@/components/editor/ui/EditorLinkList.vue";
import { RoomType } from "@/core/types/game/RoomType";

export default defineComponent({
  components: { EditorLinkList },
  name: "EditorLevelView",
  props: {
    level: {
      type: Object as PropType<Level>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const roomTypes: string[] = Object.values(RoomType);

    return {
      roomTypes,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.room-split {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  .vertical-line {
    width: auto;
    max-width: 33%;

    .label {
      font-weight: normal;
    }
  }

  .vertical-split {
    width: 3px;
    height: 120px;
    background-color: $editorFg;
  }
}

.room {
  margin-bottom: 36px;

  .title {
    font-size: 21px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 16px;
  }
}
</style>
