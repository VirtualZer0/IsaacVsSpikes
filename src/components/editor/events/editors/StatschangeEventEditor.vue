<template>
  <div class="changestats-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{$t('editor.statschangeEvent')}}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.startDialog`)}}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <!--
    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.requiredItems`)}}</label>
      <editor-link-list :links="event.requiredItems" type="items"/>
    </div>
    -->

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.requiredStats`)}}</label>

      <div class="nth-format">
        <div class="stat-line" v-for="[stat, params] of Object.entries(requiredStats)" :key="stat">

          <div class="name">{{$t(`game.${stat}`)}}</div>

          <div class="checkbox" v-if="typeof params == 'boolean'">
            <editor-checkbox v-model="(requiredStats as any)[stat]" />
            <div class="sub">{{$t(`editor.give`)}}</div>
          </div>

          <input v-if="typeof params == 'number'" class="eui input" type="number"
            v-model.number="(requiredStats as any)[stat]" />

          <div class="range" v-else-if="isArray(params)">
            <editor-tag-list :tags="params" />
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

import { RoomStatsChangeEvent } from "@/core/classes/game/sub/room/RoomStatsChangeEvent";
import EditorLinkList from "../../ui/EditorLinkList.vue";
import EditorTagList from "../../ui/EditorTagList.vue";
import { isArray } from "@vue/shared";

export default defineComponent({
  name: "StatschangeEventEditor",
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCheckbox,
    EditorTagList
    //EditorLinkList
},
  props: {
    event: {
      type: Object as PropType<RoomStatsChangeEvent>,
      required: true
    }
  },
  setup(props) {

    const requiredStats = reactive(props.event.stats);

    const changeParam = (param: string, value: any) => {
      (requiredStats as Record<string, any>)[param] = value;
    }

    return {
      requiredStats,
      changeParam,
      isArray
    };
  }
});
</script>

<style lang="scss" scoped>
.changestats-event-editor {

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
    .stat-line:nth-child(2n+1) {
      background-color: $editorBgInvariant;
    }
  }

  .stat-line {

    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;
    padding: 0 8px;

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
      width: 150px;
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