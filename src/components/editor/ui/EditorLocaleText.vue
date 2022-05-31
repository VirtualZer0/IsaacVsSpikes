<template>
  <div class="editor-locale-input quill">
      <QuillEditor
        class="eui quill-editor"
        ref="textEditor"
        theme="snow"
        :content="currentText"
        :toolbar="`#${customToolbarId}`"
        contentType="html"
        @textChange="textChange">

        <template #toolbar>
          <div :id="customToolbarId" class="quill-custom-toolbar eui">
            <div>
              <button class="ql-bold"/>
              <button class="ql-italic"/>
              <button class="ql-underline"/>
              <button class="ql-strike"/>
              <button class="ql-blockquote"/>
              <select class="ql-align">
                <option selected></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>

              <select class="ql-color">
              </select>
              <select class="ql-background">
              </select>
            </div>

            <div class="language">
              <editor-combobox class="combobox" :items="allLocales" :value="currentLocale" @change="currentLocale = $event"/>
            </div>
          </div>
        </template>

      </QuillEditor>
  </div>
</template>

<script lang="ts">
import { LocaleText } from '@/core/classes/base/LocaleText'
import { useMainStore } from '@/store/main'
import { defineComponent, PropType, ref, reactive, computed, watch } from 'vue'
import EditorCombobox from './EditorCombobox.vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { v4 as uuid } from 'uuid'

export default defineComponent({
  components: { EditorCombobox, QuillEditor },
  name: 'EditorLocaleText',
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
    const textEditor = ref<Quill>(null);
    const customToolbarId = `custom-toolbar-${uuid()}`;

    const currentText = computed(() => {
      return copyText[currentLocale.value] || '';
    })

    const textChange = () => {
      if (!textEditor.value) {
        return;
      }

      copyText[currentLocale.value] = textEditor.value.getHTML();
      emit('change', copyText)
    }

    watch(currentLocale, (newVal, oldVal) => {
      if (newVal === oldVal || !textEditor.value) {
        return;
      }

      textEditor.value.setHTML(copyText[currentLocale.value] || '');
    })

    return {
      currentLocale,
      allLocales,
      currentText,
      copyText,
      textEditor,
      textChange,
      customToolbarId
    }
  },
})
</script>


<style lang="scss" scoped>
.editor-locale-input {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .quill {
    justify-content: flex-start;
    text-align: left;
  }

  .combobox {
    width: 65px;
  }

  .quill-custom-toolbar {
    margin-bottom: -8px;
    width: 100%;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    border: none;


    &::after {
      display: none;
    }
  }
}
</style>