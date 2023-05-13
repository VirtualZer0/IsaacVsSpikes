<template>
  <div class="counter-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t('editor.counterEvent') }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.startDialog`) }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <div class="vertical-line small">
      <label class="eui label">{{ $t(`editor.counterEventScope.main`) }}</label>
      <editor-combobox
        :items="counterScopes"
        :value="event.scope"
        @change="event.scope = $event"
        style="width: 210px"
      />
    </div>

    <div class="vertical-line small">
      <label class="eui label">{{ $t(`editor.counterEventMode.main`) }}</label>
      <editor-combobox
        :items="counterModes"
        :value="event.mode"
        @change="event.mode = $event"
        style="width: 210px"
      />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.value`) }}</label>
      <div class="one-line">
        <editor-combobox
          v-if="event.mode === CounterEventMode.CHECK"
          :items="checkModes"
          :value="event.checkMode"
          @change="event.checkMode = $event"
          style="width: 50px"
        />
        <input class="eui input" type="number" v-model.number="event.value" />
      </div>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.label`) }}</label>
      <input class="eui input" v-model.number="event.label" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  CounterEventScope,
  RoomCounterEvent,
} from '@/core/classes/game/resources/sub/room/RoomCounterEvent';
import { defineComponent, PropType, ref, watch } from 'vue';

import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EditorCombobox from '../../ui/EditorCombobox.vue';
import EventIcon from '../EventIcon.vue';
import { NIL as nilUUid } from 'uuid';
import { useI18n } from 'vue-i18n';
import { CounterEventMode } from '@/core/types/game/CounterEventMode';
import { CounterEventCheck } from '@/core/types/game/CounterEventCheck';

export default defineComponent({
  name: 'CounterEventEditor',
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorCombobox,
  },
  props: {
    event: {
      type: Object as PropType<RoomCounterEvent>,
      required: true,
    },
  },
  setup(props) {
    const curEvent = ref(props.event);
    const { t } = useI18n();

    const counterScopes = Object.values(CounterEventScope).map((type) => ({
      value: type,
      name: t(`editor.counterEventScope.${type}`),
    }));

    const counterModes = Object.values(CounterEventMode).map((type) => ({
      value: type,
      name: t(`editor.counterEventMode.${type}`),
    }));

    const checkModes = Object.values(CounterEventCheck).map((type) => ({
      value: type,
      name: t(`editor.counterEventCheck.${type}`),
    }));

    watch(
      () => props.event.mode,
      (mode) => {
        if (
          mode === CounterEventMode.CHECK &&
          Object.values(props.event.outputEvents).length !== 2
        ) {
          props.event.outputEvents = {
            success: nilUUid,
            fail: nilUUid,
          };
        } else if (
          mode !== CounterEventMode.CHECK &&
          Object.values(props.event.outputEvents).length !== 1
        ) {
          props.event.outputEvents = {
            next: nilUUid,
          };
        }
      }
    );

    return {
      curEvent,
      counterScopes,
      counterModes,
      checkModes,
      CounterEventMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.counter-event-editor {
  padding-bottom: 24px;
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

  .vertical-line.small {
    width: 335px;
  }

  .one-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .variants {
    margin-top: 12px;
    margin-bottom: 12px;

    .variant {
      padding: 8px;

      &:nth-child(2n) {
        background: $editorBgInvariant;
      }

      .variant-out {
        display: flex;
        gap: 8px;
        align-items: center;
        text-align: left;
        font-weight: bold;

        .input {
          width: 100px;
        }

        .name {
          width: 175px;
        }

        .remove {
          width: 24px;
          height: 24px;
          padding: 0;

          &:hover {
            svg {
              fill: $editorBg;
            }
            background: #f44336;
            border-color: #f44336;
          }
        }
      }
    }
  }

  .add-variant {
    display: flex;
    gap: 12px;
    align-items: center;
    font-weight: bold;

    .input {
      width: 100px;
    }
  }
}
</style>
