<template>
  <div class="select-event-editor eui edit-form">
    <div class="title">
      <event-icon :type="event.type" class="icon" />
      {{ $t("editor.selectEvent") }}
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
      <label class="eui label">{{ $t(`editor.variants`) }}</label>
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
            {{ $t(`editor.out`) }} {{ variant.key }}
          </div>

          <div class="variant-line">
            <editor-locale-text class="input" :text="variant.text" />
          </div>

          <div class="horizontal-line">
            <editor-checkbox v-model="variant.showFuture" />
            Показывать будущее
          </div>

          <div class="horizontal-line">
            <editor-checkbox v-model="variant.requirment" />
            Следующая проверка как требование
          </div>
        </div>
      </div>

      <div class="add-variant">
        {{ $t(`editor.newOutKey`) }}
        <input class="eui input" type="text" v-model="newVariantKey" />
        <button class="eui button" @click="addVariant">
          {{ $t(`editor.addVariant`) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RoomSelectEvent } from "@/core/classes/game/sub/room/RoomSelectEvent";
import { defineComponent, PropType, ref } from "vue";

import EditorLocaleMultiText from "@/components/editor/ui/EditorLocaleMultiText.vue";
import EditorLocaleInput from "../../ui/EditorLocaleInput.vue";
import EventIcon from "../EventIcon.vue";
import { NIL as nilUUid } from "uuid";
import EditorLocaleText from "../../ui/EditorLocaleText.vue";
import { useI18n } from "vue-i18n";
import EditorCheckbox from "../../ui/EditorCheckbox.vue";

export default defineComponent({
  name: "SelectEventEditor",
  components: {
    EditorLocaleInput,
    EditorLocaleMultiText,
    EventIcon,
    EditorLocaleText,
    EditorCheckbox,
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
        alert(t("editor.keyAlreadyExists"));
        return;
      }

      curEvent.value.variants.push({
        text: {},
        key: newVariantKey.value,
        showFuture: false,
        requirment: false,
      });

      curEvent.value.outputEvents[newVariantKey.value] = nilUUid;
      newVariantKey.value = "out" + (curEvent.value.variants.length + 1);
    };

    const removeVariant = (index: number) => {
      const [removedVariant] = curEvent.value.variants.splice(index, 1);
      delete curEvent.value.outputEvents[removedVariant.key];

      newVariantKey.value = "out" + (curEvent.value.variants.length + 1);
    };

    return {
      curEvent,
      newVariantKey,
      addVariant,
      removeVariant,
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
