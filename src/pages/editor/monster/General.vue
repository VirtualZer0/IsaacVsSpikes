<template>
  <div class="monster-editor-general eui edit-form">
    <!--<div class="vertical-line">
      <label class="eui label">{{$t(`editor.sprite`)}}</label>
      <editor-link type="assets" :res="monster.sprite" @select="curMonster.sprite = $event"
        @remove="curMonster.sprite = null" spriteMode />
    </div>-->

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.tags`) }}</label>
      <editor-tag-list :tags="monster.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.note`) }}</label>
      <textarea v-model="curMonster.note" class="eui textarea small" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.name`) }}</label>
      <editor-locale-input class="input" :text="monster.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.description`) }}</label>
      <editor-locale-text class="input" :text="monster.desc" />
    </div>
  </div>
</template>

<script lang="ts">
import EditorLocaleInput from "@/components/editor/ui/EditorLocaleInput.vue";
import EditorLocaleText from "@/components/editor/ui/EditorLocaleText.vue";
import { Monster } from "@/core/classes/game/Monster";
import { defineComponent, PropType, reactive } from "vue";
import EditorTagList from "@/components/editor/ui/EditorTagList.vue";

export default defineComponent({
  components: { EditorLocaleInput, EditorLocaleText, EditorTagList },
  name: "EditorMonsterGeneral",
  props: {
    monster: {
      type: Object as PropType<Monster>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const curMonster = reactive(props.monster);

    return {
      curMonster,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.input.small {
  width: 100px;
}

.monster-split {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  .vertical-line {
    width: auto;
    max-width: 33%;
  }

  .vertical-split {
    width: 3px;
    height: 120px;
    background-color: $editorFg;
  }
}
</style>
