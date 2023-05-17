<template>
  <div class="select-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t('editor.selectEvent') }}
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="event.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="event.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t('editor.startDialog') }}</label>
      <editor-locale-multi-text class="input" :text="event.startDialog" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t('editor.variants') }}</label>
      <div class="variants">
        <div
          class="variant"
          v-for="(variant, num) in curEvent.variants"
          :key="num"
        >
          <div class="variant-out">
            <button class="eui button remove" @click="removeVariant(num)">
              <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </svg>
            </button>
            {{ $t('editor.out') }} {{ variant.key }}
          </div>

          <div class="variant-line">
            <editor-locale-text class="input" :text="variant.text" />
          </div>

          <div class="horizontal-line">
            <editor-checkbox v-model="variant.showFuture" />
            {{ $t('editor.showFuture') }}
          </div>

          <div class="horizontal-line">
            <editor-checkbox v-model="variant.requirment.enabled" />
            {{ $t('editor.requirments') }}
          </div>

          <div class="requirments" v-if="variant.requirment.enabled">
            <div class="vertical-line">
              <label class="eui label">{{ $t('editor.consumables') }}</label>

              <div class="stat-line">
                <div class="name">{{ $t('game.coins') }}</div>
                <input
                  class="eui input"
                  type="number"
                  v-model="variant.requirment.consumables.coins"
                />
              </div>

              <div class="stat-line">
                <div class="name">{{ $t('game.bombs') }}</div>
                <input
                  class="eui input"
                  type="number"
                  v-model="variant.requirment.consumables.bombs"
                />
              </div>

              <div class="stat-line">
                <div class="name">{{ $t('game.keys') }}</div>
                <input
                  class="eui input"
                  type="number"
                  v-model="variant.requirment.consumables.keys"
                />
              </div>

              <div class="stat-line">
                <div class="name">{{ $t('game.blueFriends') }}</div>
                <input
                  class="eui input"
                  type="number"
                  v-model="variant.requirment.consumables.blueFriends"
                />
              </div>

              <div class="stat-line">
                <div class="name">{{ $t('game.goldenBomb') }}</div>
                <editor-checkbox
                  v-model="variant.requirment.consumables.goldenBomb"
                />
              </div>

              <div class="stat-line">
                <div class="name">{{ $t('game.goldenKey') }}</div>
                <editor-checkbox
                  v-model="variant.requirment.consumables.goldenKey"
                />
              </div>
            </div>

            <div class="vertical-line">
              <label class="eui label">{{ $t('game.health') }}</label>
              <editor-hearts :health="variant.requirment.hearts" />
            </div>

            <div class="vertical-line">
              <label class="eui label">{{ $t('editor.damage') }}</label>
              <div class="stat-line">
                <div class="checkbox">
                  <editor-checkbox v-model="variant.requirment.damageEnabled" />
                  <div class="sub">{{ $t('editor.enableDamage') }}</div>
                </div>
              </div>
              <template v-if="variant.requirment.damageEnabled">
                <div class="stat-line">
                  <div class="name">{{ $t('editor.count') }}</div>
                  <input
                    class="eui input"
                    type="number"
                    v-model.number="variant.requirment.damage"
                  />
                </div>
                <div class="stat-line">
                  <div class="name">{{ $t('editor.damageType.main') }}</div>
                  <editor-combobox
                    :items="damageTypes"
                    :value="variant.requirment.damageType"
                    @change="variant.requirment.damageType = $event"
                    style="width: 210px"
                  />
                </div>
                <div class="stat-line">
                  <div class="name">{{ $t('editor.tags') }}</div>
                  <editor-tag-list :tags="variant.requirment.damageTags" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="add-variant">
        {{ $t('editor.newOutKey') }}
        <input class="eui input" type="text" v-model="newVariantKey" />
        <button class="eui button" @click="addVariant">
          {{ $t('editor.addVariant') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  RoomSelectEvent,
  RoomSelectEventVariant,
} from '@/core/classes/game/resources/sub/room/RoomSelectEvent';
import { defineComponent, PropType, ref } from 'vue';

import EditorLocaleMultiText from '@/components/editor/ui/EditorLocaleMultiText.vue';
import EditorLocaleInput from '../../ui/EditorLocaleInput.vue';
import EventIcon from '../EventIcon.vue';
import { NIL as nilUUid } from 'uuid';
import EditorLocaleText from '../../ui/EditorLocaleText.vue';
import { useI18n } from 'vue-i18n';
import EditorCheckbox from '../../ui/EditorCheckbox.vue';
import EditorHearts from '../../ui/EditorHearts.vue';
import EditorCombobox from '../../ui/EditorCombobox.vue';
import EditorTagList from '../../ui/EditorTagList.vue';
import { DamageType } from '@/core/types/game/DamageType';

export default defineComponent({
  name: 'SelectEventEditor',
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorLocaleText,
    EditorCheckbox,
    EditorHearts,
    EditorCombobox,
    EditorTagList,
  },
  props: {
    event: {
      type: Object as PropType<RoomSelectEvent>,
      required: true,
    },
  },
  setup(props) {
    const curEvent = ref(props.event);
    const newVariantKey = ref(`out${curEvent.value.variants.length + 1}`);
    const { t } = useI18n();

    const addVariant = () => {
      if (curEvent.value.outputEvents[newVariantKey.value]) {
        alert(t('editor.keyAlreadyExists'));
        return;
      }

      const newVar = new RoomSelectEventVariant();
      newVar.key = newVariantKey.value;
      curEvent.value.variants.push(newVar);

      curEvent.value.outputEvents[newVariantKey.value] = nilUUid;
      newVariantKey.value = 'out' + (curEvent.value.variants.length + 1);
    };

    const removeVariant = (index: number) => {
      const [removedVariant] = curEvent.value.variants.splice(index, 1);
      delete curEvent.value.outputEvents[removedVariant.key];

      newVariantKey.value = 'out' + (curEvent.value.variants.length + 1);
    };

    const damageTypes = Object.values(DamageType).map((type) => ({
      value: type,
      name: t(`editor.damageType.${type}`),
    }));

    return {
      curEvent,
      newVariantKey,
      addVariant,
      removeVariant,
      damageTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
.select-event-editor {
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

  .variants {
    margin-top: 12px;

    .variant {
      margin-bottom: 21px;
      padding: 12px;

      &:nth-child(2n) {
        background: $editorBgInvariant;
      }

      &-line {
        margin-bottom: 4px;
      }

      .horizontal-line {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
      }

      &-out {
        display: flex;
        gap: 8px;
        align-items: center;
        text-align: left;
        font-weight: bold;
        margin-bottom: 8px;

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

      .requirments {
        margin-top: 16px;
        width: 680px;
        padding: 12px;
        border: 2px dashed $editorFg;
      }

      .vertical-line {
        .label {
          font-size: 16px;
        }
      }

      .stat-line {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 38px;
        padding: 4px;
        .input {
          width: 60px;
          background: $editorPaper;
          margin-right: 16px;
        }

        .name {
          min-width: 120px;
          text-align: left;
        }

        .checkbox {
          display: flex;
          align-items: center;
          gap: 4px;
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
