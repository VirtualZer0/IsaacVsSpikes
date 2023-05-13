<template>
  <div class="changestats-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t('editor.statschangeEvent') }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t('editor.name') }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t('editor.startDialog') }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <editor-stats-form :stat-modifier="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';

import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EventIcon from '../EventIcon.vue';

import EditorCheckbox from '../../ui/EditorCheckbox.vue';
import EditorTagList from '../../ui/EditorTagList.vue';

import { RoomStatsChangeEvent } from '@/core/classes/game/resources/sub/room/RoomStatsChangeEvent';
import { isArray } from '@vue/shared';
import EditorCombobox from '../../ui/EditorCombobox.vue';
import { DamageType } from '@/core/types/game/DamageType';

import i18n from '@/i18n';
import { CharacterHearts } from '@/core/classes/game/resources/sub/character/CharacterHealth';
import EditorConsumablesForm from '../../forms/EditorConsumablesForm.vue';
import EditorStatsForm from '../../forms/EditorStatsForm.vue';

const { t } = i18n.global;

export default defineComponent({
  name: 'StatschangeEventEditor',
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCheckbox,
    EditorTagList,
    EditorCombobox,
    EditorConsumablesForm,
    EditorStatsForm,
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

    // Check integrity
    if (!props.event.addHealth) {
      props.event.addHealth = new CharacterHearts();
    }

    if (!props.event.removeHealth) {
      props.event.removeHealth = new CharacterHearts();
    }

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
