<template>
  <div class="level-editor-general eui edit-form">

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.name`)}}</label>
      <editor-locale-input class="input" :text="doorDesc.name" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.tags`)}}</label>
      <editor-tag-list :tags="doorDesc.tags" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.note`)}}</label>
      <textarea v-model="curDoorDesc.note" class="eui textarea small" />
    </div>

    <div class="vertical-line">
      <label class="eui label">{{$t(`editor.description`)}}</label>
      <editor-locale-text class="input" :text="doorDesc.text" />
    </div>
  </div>
</template>

<script lang="ts">
import { DoorDesc } from '@/core/classes/game/DoorDesc';
import { defineComponent, PropType, ref} from 'vue';
import EditorLocaleText from '@/components/editor/ui/EditorLocaleText.vue';
import EditorLocaleInput from '@/components/editor/ui/EditorLocaleInput.vue';
import EditorTagList from '@/components/editor/ui/EditorTagList.vue';

export default defineComponent({
  components: { EditorLocaleText, EditorLocaleInput, EditorTagList },
  name: 'EditorDoorDescGeneral',
  props: {
    doorDesc: {
      type: Object as PropType<DoorDesc>,
      required: true
    }
  },

  setup(props, { emit }) {
    const curDoorDesc = ref(props.doorDesc);
    return {
      curDoorDesc,
      emit
    }
  },
})
</script>


<style lang="scss" scoped>

.checkbox {
  margin-right: 12px;
}

.line {

  margin-bottom: 12px !important;

  .input.small {
    width: 85px;
    min-width: 85px;
    margin-left: 12px;
  }

  .sublabel {
    text-align: left;
    width: 115px;
  }
}

</style>