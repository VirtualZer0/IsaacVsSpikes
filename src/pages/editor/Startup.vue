<template>
  <div class="editor editor-startup">
    <div class="eui card shadow-l2">
      <div class="title">{{$t('editor.welcome')}}</div>
      <div class="buttons">

        <button class="eui button" @click="$router.push('/editor/new')">
          <svg style="width:32px;height:32px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12H14V10H16V12H18V14H16V16H14V14H12V12M22 8V18C22 19.11 21.11 20 20 20H4C2.89 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.11 6 22 6.89 22 8M20 8H4V18H20V8Z" />
          </svg>
          {{$t('editor.createProject')}}
        </button>

        <button class="eui button" @click="openProject">
          <svg style="width:32px;height:32px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" />
          </svg>
          {{$t('editor.openProject')}}
        </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from '@/store/editor'
import { useRouter } from 'vue-router'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'EditorStartupScreen',

  setup() {
    const editor = useEditorStore();
    const router = useRouter();

    const openProject = async () => {
      await editor.loadProject();

      watch(() => editor.isOpen, async () => {
        router.push('/editor/list');
      });
    }

    return {
      openProject
    }
  }
})
</script>


<style lang="scss" scoped>
.editor-startup {

  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;

}

.card {
  height: 350px;
  width: 60%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 50px;
  }

  .buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  button {
    font-size: 22px;
    width: 40%;
    height: 65px;
  }
}
</style>