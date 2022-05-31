<template>
  <div class="editor-locale-input">
    <input type="text" class="eui input" :value="currentText" @input="copyText[currentLocale] = ($event.target as any).value; emit('change', copyText)"/>
    <editor-combobox class="combobox" :items="allLocales" :value="currentLocale" @change="currentLocale = $event"/>
  </div>
</template>

<script lang="ts">
import { LocaleText } from '@/core/classes/base/LocaleText'
import { useMainStore } from '@/store/main'
import { defineComponent, PropType, ref, reactive, computed } from 'vue'
import EditorCombobox from './EditorCombobox.vue';

export default defineComponent({
  components: { EditorCombobox },
  name: 'EditorLocaleInput',
  emits: ['change'],
  props: {
    text: {
      type: Object as PropType<LocaleText>,
      required: true,
    }
  },
  setup(props, { emit }) {
    const store = useMainStore();
    const currentLocale = ref(store.currentLocale);
    const allLocales = store.allLocales.map(locale => ({name: locale, value: locale}));
    const copyText = reactive<LocaleText>(props.text)

    const currentText = computed(() => {
      return copyText[currentLocale.value] || '';
    })

    return {
      currentLocale,
      allLocales,
      currentText,
      copyText,
      emit
    }
  },
})
</script>


<style lang="scss" scoped>
.editor-locale-input {
  display: flex;
  align-items: center;
  gap: 6px;

  .input {
    width: 100%;
  }

  .combobox {
    min-width: 65px;
  }
}
</style>