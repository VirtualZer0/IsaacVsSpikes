<template>
  <div class="eui modal">
    <div class="top">
      <div class="title">{{title}}</div>
      <button class="eui button" @click="emit('close')">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">import { defineComponent } from "vue";

export default defineComponent({
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  setup(props, { emit }) {
    return {
      emit
    }
  }
});

</script>

<style lang="scss" scoped>





.modal {
  position: fixed;
  top: 2vh;
  left: 2vw;
  width: 96vw;
  height: 96vh;
  z-index: 100;
  border: 2px solid $editorFg;
  background: $editorPaper;
  overflow: hidden;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    font-size: 21px;
    border-bottom: 2px solid $editorFg;
    background: $editorFg;
    color: $editorBg;

    .button {
      color: $editorBg;
      border-color: $editorBg;
      height: 28px;
      width: 28px;
      padding: 0;

      &:hover {
        color: $editorFg;
        background: $editorBg;
      }
    }
  }

  .content {
    max-height: calc(96vh - 46px);
    overflow: auto;
  }
}

</style>