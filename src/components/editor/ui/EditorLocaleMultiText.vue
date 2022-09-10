<template>
  <div class="editor-locale-input quill" :key="updateKey.toString()">
    <!-- TODO: Переписать при первой же возможности. Создавать на каждый редактор свой тулбар это жопа. -->
    <div
      :id="customToolbarId + num"
      class="quill-custom-toolbar eui"
      v-for="(_b, num) in text"
      :key="`${num}-${updateKey.toString()}`"
      v-show="activeEditor == num"
    >
      <div>
        <button class="ql-bold" />
        <button class="ql-italic" />
        <button class="ql-underline" />
        <button class="ql-strike" />
        <button class="ql-blockquote" />
        <select class="ql-align">
          <option selected :key="num"></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>

        <select class="ql-color" :key="num"></select>
        <select class="ql-background" :key="num"></select>
      </div>

      <div class="language">
        <editor-combobox
          class="combobox"
          :items="allLocales"
          :value="currentLocale"
          @change="currentLocale = $event"
        />
      </div>
    </div>

    <div class="text-block" v-for="(blocks, num) in copyText" :key="num">
      <div class="text-block-controls">
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          @click="removeBlock(num)"
        >
          <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>

      <QuillEditor
        class="eui quill-editor quill-fullwidth"
        style="min-height: 48px"
        :ref="setEditor"
        theme="snow"
        :content="
          copyText[num] && copyText[num][currentLocale]
            ? copyText[num][currentLocale]
            : ''
        "
        :toolbar="`#${customToolbarId + num}`"
        contentType="html"
        @click="activeEditor = num"
        @textChange="textChange(num)"
      />
    </div>

    <div class="text-block-add">
      <button @click="addBlock" class="eui button">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { LocaleText } from "@/core/classes/base/LocaleText";
import { useMainStore } from "@/store/main";
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  onBeforeUpdate,
  watch,
} from "vue";
import EditorCombobox from "./EditorCombobox.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { v4 as uuid } from "uuid";

export default defineComponent({
  components: { EditorCombobox, QuillEditor },
  name: "EditorLocaleMultiText",
  emits: ["change"],
  props: {
    text: {
      type: Array as PropType<LocaleText[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useMainStore();
    const currentLocale = ref(store.currentLocale);
    const allLocales = store.allLocales.map((locale) => ({
      name: locale,
      value: locale,
    }));
    const copyText = reactive<LocaleText[]>(props.text);
    const editors = ref<Quill[]>([]);
    const customToolbarId = `custom-toolbar-${uuid()}`;
    const activeEditor = ref(0);
    const updateKey = ref(false);

    const setEditor = (ref: Quill) => {
      editors.value.push(ref);
    };

    const textChange = (num: number) => {
      editors.value = editors.value.filter((item) => item);
      if (!editors.value[num]) {
        console.log("Err", num, editors.value);
        return;
      }

      copyText[num][currentLocale.value] = editors.value[num].getHTML();
      emit("change", copyText);
    };

    const addBlock = () => {
      copyText.push({});
      updateKey.value = !updateKey.value;
    };

    const removeBlock = (num: number) => {
      if (copyText.length == 1) {
        return;
      }

      copyText.splice(num, 1);
      editors.value = editors.value.filter((item) => item);

      if (num != 0) {
        activeEditor.value = num - 1;
      }

      updateKey.value = !updateKey.value;
    };

    onBeforeUpdate(() => {
      editors.value = [];
    });

    watch(currentLocale, (newVal, oldVal) => {
      if (newVal === oldVal) {
        return;
      }

      for (let i = 0; i < editors.value.length; i++) {
        editors.value[i].setHTML(copyText[i][newVal] || "");
      }
    });

    return {
      currentLocale,
      allLocales,
      copyText,
      setEditor,
      textChange,
      activeEditor,
      addBlock,
      removeBlock,
      customToolbarId,
      updateKey,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-locale-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;

  .quill {
    justify-content: flex-start;
    text-align: left;
  }

  .combobox {
    width: 65px;
  }

  .text-block {
    display: flex;
    justify-content: stretch;
    gap: 12px;
    margin-bottom: 12px;
  }

  .text-block-controls {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold;
    gap: 6px;

    svg {
      cursor: pointer;
      border: 2px solid $editorFg;
      transition: all 0.2s ease-in-out;

      &:hover {
        fill: $editorBg;
        background: #f44336;
        border-color: #f44336;
      }
    }
  }

  .text-block-add {
    display: flex;
    justify-content: center;
    height: 2px;
    background: $editorFg;
    margin-left: 36px;
    margin-top: -10px;

    button {
      height: 18px;
      width: 20%;
      padding-top: 6px;
      font-weight: bold;
    }
  }

  .quill-custom-toolbar {
    width: 100%;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    border: none;
    overflow: visible;

    &::after {
      display: none;
    }
  }
}
</style>
