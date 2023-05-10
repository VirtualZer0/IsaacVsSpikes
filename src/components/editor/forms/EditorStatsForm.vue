<template>
  <div class="eui base-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t('editor.addHealth') }}</label>
      <editor-hearts class="input" :health="curStatModifier.addHealth" />
    </div>

    <div class="vertical-line" v-if="curStatModifier.removeHealth">
      <label class="eui label">{{ $t('editor.removeHealth') }}</label>
      <editor-hearts class="input" :health="curStatModifier.removeHealth" />
    </div>

    <div
      class="vertical-line"
      v-if="curStatModifier.damageEnabled !== undefined"
    >
      <label class="eui label">{{ $t('editor.damage') }}</label>
      <div class="nth-format">
        <div class="stat-line">
          <div class="checkbox">
            <editor-checkbox v-model="curStatModifier.damageEnabled" />
            <div class="sub">{{ $t('editor.enableDamage') }}</div>
          </div>
        </div>
        <template v-if="curStatModifier.damageEnabled">
          <div class="stat-line">
            <div class="name">{{ $t('editor.count') }}</div>
            <input
              class="eui input"
              type="number"
              v-model.number="curStatModifier.damage"
            />
          </div>
          <div class="stat-line">
            <div class="name">{{ $t('editor.damageType.main') }}</div>
            <editor-combobox
              :items="damageTypes"
              :value="curStatModifier.damageType"
              @change="curStatModifier.damageType = $event"
              style="width: 210px"
            />
          </div>
          <div class="stat-line">
            <div class="name">{{ $t('editor.tags') }}</div>
            <editor-tag-list :tags="curStatModifier.damageTags" />
          </div>
        </template>
      </div>
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.changedStats`) }}</label>

      <div class="nth-format">
        <div
          class="stat-line"
          v-for="[stat, params] of Object.entries(curStatModifier.stats)"
          :key="stat"
        >
          <div class="name">{{ $t(`game.${stat}`) }}</div>

          <div class="checkbox" v-if="typeof params == 'boolean'">
            <editor-checkbox v-model="(curStatModifier.stats as any)[stat]" />
            <div class="sub">{{ $t(`editor.give`) }}</div>
          </div>

          <input
            v-else
            class="eui input"
            type="number"
            v-model.number="(curStatModifier.stats as any)[stat]"
          />
        </div>
        <div class="stat-line">
          <div class="name">{{ $t(`game.addTags`) }}</div>
          <div class="range">
            <editor-tag-list :tags="curStatModifier.addedTags" />
          </div>
        </div>
        <div class="stat-line" v-if="curStatModifier.removedTags">
          <div class="name">{{ $t(`game.removeTags`) }}</div>
          <div class="range">
            <editor-tag-list :tags="curStatModifier.removedTags" />
          </div>
        </div>
      </div>
    </div>

    <EditorConsumablesForm :consumables="curStatModifier.consumables" />
  </div>
</template>
<script setup lang="ts">
import { IStatModifier } from '@/core/classes/game/sub/character/IStatModifier';
import { DamageType } from '@/core/types/game/DamageType';
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import EditorCheckbox from '../ui/EditorCheckbox.vue';
import EditorCombobox from '../ui/EditorCombobox.vue';
import EditorHearts from '../ui/EditorHearts.vue';
import EditorTagList from '../ui/EditorTagList.vue';
import EditorConsumablesForm from './EditorConsumablesForm.vue';

const { t } = useI18n();

const props = defineProps({
  statModifier: { type: Object as PropType<IStatModifier>, required: true },
});

const curStatModifier = ref(props.statModifier);

const damageTypes = Object.values(DamageType).map((type) => ({
  value: type,
  name: t(`editor.damageType.${type}`),
}));
</script>
