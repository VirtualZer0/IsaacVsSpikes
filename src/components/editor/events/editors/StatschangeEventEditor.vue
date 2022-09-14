<template>
  <div class="changestats-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t("editor.statschangeEvent") }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t("editor.name") }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t("editor.startDialog") }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t("editor.addHealth") }}</label>
      <editor-hearts class="input" :health="event.addHealth" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t("editor.removeHealth") }}</label>
      <editor-hearts class="input" :health="event.removeHealth" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t("editor.damage") }}</label>
      <div class="nth-format">
        <div class="stat-line">
          <div class="checkbox">
            <editor-checkbox v-model="event.damageEnabled" />
            <div class="sub">{{ $t("editor.enableDamage") }}</div>
          </div>
        </div>
        <template v-if="event.damageEnabled">
          <div class="stat-line">
            <div class="name">{{ $t("editor.count") }}</div>
            <input
              class="eui input"
              type="number"
              v-model.number="event.damage"
            />
          </div>
          <div class="stat-line">
            <div class="name">{{ $t("editor.damageType.main") }}</div>
            <editor-combobox
              :items="damageTypes"
              :value="event.damageType"
              @change="event.damageType = $event"
              style="width: 210px"
            />
          </div>
          <div class="stat-line">
            <div class="name">{{ $t("editor.tags") }}</div>
            <editor-tag-list :tags="event.damageTags" />
          </div>
        </template>
      </div>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.changedStats`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[stat, params] of Object.entries(requiredStats)"
          :key="stat"
        >
          <div class="name">{{ $t(`game.${stat}`) }}</div>

          <div class="checkbox" v-if="typeof params == 'boolean'">
            <editor-checkbox v-model="(requiredStats as any)[stat]" />
            <div class="sub">{{ $t(`editor.give`) }}</div>
          </div>

          <input
            v-else
            class="eui input"
            type="number"
            v-model.number="(requiredStats as any)[stat]"
          />
        </div>
        <div class="stat-line">
          <div class="name">{{ $t(`game.addTags`) }}</div>
          <div class="range">
            <editor-tag-list :tags="event.addedTags" />
          </div>
        </div>
        <div class="stat-line">
          <div class="name">{{ $t(`game.removeTags`) }}</div>
          <div class="range">
            <editor-tag-list :tags="event.removedTags" />
          </div>
        </div>
      </div>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.changedConsumables`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[consumable, params] of Object.entries(requiredConsumables)"
          :key="consumable"
        >
          <div class="name">{{ $t(`game.${consumable}`) }}</div>

          <div class="checkbox" v-if="typeof params == 'boolean'">
            <editor-checkbox
              v-model="(requiredConsumables as any)[consumable]"
            />
            <div class="sub">{{ $t("editor.give") }}</div>
          </div>

          <input
            v-else
            class="eui input"
            type="number"
            v-model.number="(requiredConsumables as any)[consumable]"
          />
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
import EditorHearts from "../../ui/EditorHearts.vue";
import EditorTagList from "../../ui/EditorTagList.vue";

import { RoomStatsChangeEvent } from "@/core/classes/game/sub/room/RoomStatsChangeEvent";
import { isArray } from "@vue/shared";
import EditorCombobox from "../../ui/EditorCombobox.vue";
import { DamageType } from "@/core/types/game/DamageType";

import i18n from "@/i18n";

const { t } = i18n.global;

export default defineComponent({
  name: "StatschangeEventEditor",
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCheckbox,
    EditorTagList,
    EditorHearts,
    EditorCombobox,
  },
  props: {
    event: {
      type: Object as PropType<RoomStatsChangeEvent>,
      required: true,
    },
  },
  setup(props) {
    const requiredStats = reactive(props.event.stats);
    const requiredConsumables = reactive(props.event.consumables);

    const changeParam = (param: string, value: any) => {
      (requiredStats as Record<string, any>)[param] = value;
    };

    const damageTypes = Object.values(DamageType).map((type) => ({
      value: type,
      name: t(`editor.damageType.${type}`),
    }));

    return {
      requiredStats,
      requiredConsumables,
      changeParam,
      isArray,
      damageTypes,
    };
  },
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
    .stat-line:nth-child(2n + 1) {
      background-color: $editorBgInvariant;
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
