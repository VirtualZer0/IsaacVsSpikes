<template>
  <div class="editor editor-new-project">
    <div class="eui card shadow-l2">
      <div class="title">{{$t('editor.createProject')}}</div>

      <div class="eui fast-flex">
        <label class="eui label">{{$t('editor.projectName')}}</label>
        <input type="text" v-model="projectName" class="eui input"/>
      </div>

      <div class="eui fast-flex">
        <label class="eui label">{{$t('editor.projectDir')}}</label>
        <input type="text" v-model="projectDir" class="eui input"/>
      </div>

      <div class="buttons">

        <button class="eui button" @click="createProject">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12H14V10H16V12H18V14H16V16H14V14H12V12M22 8V18C22 19.11 21.11 20 20 20H4C2.89 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.11 6 22 6.89 22 8M20 8H4V18H20V8Z" />
          </svg>
          {{$t('editor.create')}}
        </button>

        <button class="eui button" @click="router.push('/editor')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
          {{$t('editor.cancel')}}
        </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useEditorStore } from '@/store/editor'
import sanitize from 'sanitize-filename'
import { createFS } from '@/utils/uniFS/createFS';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditorNewProjectScreen',
  setup() {
    const router = useRouter();
    const projectName = ref('New Project');
    const projectDir = ref('new_project');
    const editor = useEditorStore();

    watch(projectName, val => {
      projectDir.value = sanitize(val.toLowerCase().replace(/\s/g, '_'))
    });

    const createProject = async () => {

      watch(() => editor.isOpen, async () => {
        router.push('/editor/list');
      });

      editor.$patch({
        fs: await createFS()
      })

      await editor.fs?.init();
      await editor.createProject(projectName.value, projectDir.value);
    }

    return {
      projectName, projectDir, createProject, router
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-new-project {

  @include center;
  flex-grow: 1;
  height: 100%;

}

.card {
  height: 350px;
  width: 60%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  .title {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
  }

  .buttons {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    position: absolute;
    bottom: 20px;
  }
}

.input {
  width: 350px;
}

.label {
  min-width: 125px;
  text-align: left;
}
</style>