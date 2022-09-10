<template>
  <div class="reward-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t("editor.rewardEvent") }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.startDialog`) }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.items`) }}</label>
      <editor-link-list :links="event.reward" type="items" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.consumables`) }}</label>

      <div class="nth-format">
        <div class="stat-line">
          <div class="name">{{ $t("game.coins") }}</div>
          <input
            class="eui input"
            type="number"
            v-model.number="curEvent.pickups.coins"
          />
        </div>

        <div class="stat-line">
          <div class="name">{{ $t("game.bombs") }}</div>
          <input
            class="eui input"
            type="number"
            v-model.number="curEvent.pickups.bombs"
          />

          <div class="checkbox">
            <editor-checkbox v-model="curEvent.goldenBomb" />
            <div class="sub">{{ $t(`game.goldenVersion`) }}</div>
          </div>
        </div>

        <div class="stat-line">
          <div class="name">{{ $t("game.keys") }}</div>
          <input
            class="eui input"
            type="number"
            v-model.number="curEvent.pickups.keys"
          />

          <div class="checkbox">
            <editor-checkbox v-model="curEvent.goldenKey" />
            <div class="sub">{{ $t(`game.goldenVersion`) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";

import EditorLocaleMultiText from "@/components/editor/ui/EditorLocaleMultiText.vue";
import EditorLocaleInput from "../../ui/EditorLocaleInput.vue";
import EventIcon from "../EventIcon.vue";

import EditorCheckbox from "../../ui/EditorCheckbox.vue";

import { RoomRewardEvent } from "@/core/classes/game/sub/room/RoomRewardEvent";
import EditorLinkList from "../../ui/EditorLinkList.vue";

export default defineComponent({
  name: "RewardEventEditor",
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCheckbox,
    EditorLinkList,
  },
  props: {
    event: {
      type: Object as PropType<RoomRewardEvent>,
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
.reward-event-editor {
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

  .nth-format {
    .stat-line:nth-child(2n + 1) {
      background-color: $editorBgInvariant;
    }
  }

  .stat-line {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;
    padding: 0 8px;

    .input {
      width: 60px;
      background: $editorPaper;
      margin-left: 8px;
      margin-right: 16px;
    }

    &:nth-child(2n) {
      background: #f5f5f5;
    }

    .name {
      font-weight: bold;
      width: 100px;
      text-align: left;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}
</style>
