<template>
  <div class="checkstats-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t("editor.statscheckEvent") }}
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
      <label class="eui label">{{ $t(`editor.requiredItems`) }}</label>
      <editor-link-list :links="event.requiredItems" type="items" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`game.health`) }}</label>
      <editor-hearts class="input" :health="event.hearts" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.requiredStats`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[stat, params] of Object.entries(requiredStats)"
          :key="stat"
        >
          <editor-checkbox v-model="params.enabled" />
          <div class="name">{{ $t(`game.${stat}`) }}</div>

          <div class="checkbox" v-if="params.type == 'boolean'">
            <editor-checkbox v-model="params.value" />
            <div class="sub">{{ $t(`editor.required`) }}</div>
          </div>

          <div
            class="range"
            v-else-if="typeof params == 'object' && params.type == 'number'"
          >
            {{ $t("editor.from") }}
            <input
              class="eui input"
              type="number"
              v-model.number="params.from"
            />
            {{ $t("editor.to") }}
            <input class="eui input" type="number" v-model.number="params.to" />
          </div>

          <div
            class="range"
            v-else-if="typeof params == 'object' && params.type == 'tags'"
          >
            <editor-tag-list :tags="params.value" />
          </div>
        </div>
      </div>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.consumables`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[consumable, params] of Object.entries(requiredConsumables)"
          :key="consumable"
        >
          <editor-checkbox v-model="params.enabled" />
          <div class="name">{{ $t(`game.${consumable}`) }}</div>

          <div class="checkbox" v-if="params.type == 'boolean'">
            <editor-checkbox v-model="params.value" />
            <div class="sub">{{ $t(`editor.required`) }}</div>
          </div>

          <div
            class="range"
            v-else-if="typeof params == 'object' && params.type == 'number'"
          >
            {{ $t("editor.from") }}
            <input
              class="eui input"
              type="number"
              v-model.number="params.from"
            />
            {{ $t("editor.to") }}
            <input class="eui input" type="number" v-model.number="params.to" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

import EditorLocaleMultiText from "@/components/editor/ui/EditorLocaleMultiText.vue";
import EditorLocaleInput from "../../ui/EditorLocaleInput.vue";
import EventIcon from "../EventIcon.vue";

import EditorCheckbox from "../../ui/EditorCheckbox.vue";

import { RoomStatsCheckEvent } from "@/core/classes/game/sub/room/RoomStatsCheckEvent";
import EditorLinkList from "../../ui/EditorLinkList.vue";
import EditorTagList from "../../ui/EditorTagList.vue";
import EditorHearts from "../../ui/EditorHearts.vue";

export default defineComponent({
  name: "StatscheckEventEditor",
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCheckbox,
    EditorLinkList,
    EditorTagList,
    EditorHearts,
  },
  props: {
    event: {
      type: Object as PropType<RoomStatsCheckEvent>,
      required: true,
    },
  },
  setup(props) {
    const requiredStats = reactive(props.event.requiredStats);
    const requiredConsumables = reactive(props.event.requiredConsumables);

    const changeParam = (param: string, value: any) => {
      (requiredStats as Record<string, any>)[param] = value;
    };

    return {
      requiredStats,
      requiredConsumables,
      changeParam,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkstats-event-editor {
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

    .input {
      background: $editorPaper;
    }
  }

  .stat-line {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    padding: 8px;

    .range {
      .input {
        width: 60px;
        background: $editorPaper;
        margin-left: 8px;
        margin-right: 16px;
      }
    }

    &:nth-child(2n) {
      background: #f5f5f5;
    }

    .name {
      font-weight: bold;
      min-width: 150px;
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
