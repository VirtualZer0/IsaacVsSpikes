<template>
  <div class="eui base-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.changedConsumables`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[consumable, params] of Object.entries(curConsumables)"
          :key="consumable"
        >
          <div class="name">{{ $t(`game.${consumable}`) }}</div>

          <div class="checkbox" v-if="typeof params == 'boolean'">
            <editor-checkbox v-model="(curConsumables as any)[consumable]" />
            <div class="sub">{{ $t('editor.give') }}</div>
          </div>

          <input
            v-else
            class="eui input"
            type="number"
            v-model.number="(curConsumables as any)[consumable]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CharacterConsumables } from '@/core/classes/game/resources/sub/character/CharacterConsumables';
import { PropType, ref } from 'vue';

import EditorCheckbox from '../ui/EditorCheckbox.vue';

const props = defineProps({
  consumables: {
    type: Object as PropType<CharacterConsumables>,
    required: true,
  },
});

const curConsumables = ref(props.consumables);
</script>
