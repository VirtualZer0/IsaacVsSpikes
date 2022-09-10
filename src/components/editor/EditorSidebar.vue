<template>
  <aside class="editor-sidebar">
    <button
      class="expand eui circleButton"
      @click="expanded = !expanded"
      :class="{ expanded }"
    >
      <svg style="width: 32px; height: 32px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"
        />
      </svg>
    </button>

    <div class="content" :class="{ expanded }">
      <div class="no-project" v-if="!editor.isOpen">
        {{ $t("editor.sidebarNoProject") }}
      </div>

      <div class="menu" v-else>
        <div class="summary">
          <div class="name">{{ editor.name }}</div>
          <div class="uuid">{{ editor.uuid }}</div>
          <div class="dir">{{ editor.dir }}</div>
        </div>

        <router-link to="/editor/list/levels"
          >{{ $t("editor.levels") }}
          <span class="count">{{ editor.levels.size }}</span></router-link
        >
        <router-link to="/editor/list/rooms"
          >{{ $t("editor.rooms") }}
          <span class="count">{{ editor.rooms.size }}</span></router-link
        >
        <router-link to="/editor/list/monsters"
          >{{ $t("editor.monsters") }}
          <span class="count">{{ editor.monsters.size }}</span></router-link
        >
        <router-link to="/editor/indev"
          >{{ $t("editor.bosses") }}
          <span class="count">{{ editor.bosses.size }}</span></router-link
        >
        <router-link to="/editor/indev"
          >{{ $t("editor.objects") }}
          <span class="count">{{ editor.objects.size }}</span></router-link
        >
        <router-link to="/editor/indev"
          >{{ $t("editor.items") }}
          <span class="count">{{ editor.items.size }}</span></router-link
        >
        <router-link to="/editor/indev"
          >{{ $t("editor.characters") }}
          <span class="count">{{ editor.characters.size }}</span></router-link
        >
        <router-link to="/editor/list/assets"
          >{{ $t("editor.resources") }}
          <span class="count">{{ editor.assets.size }}</span></router-link
        >
        <router-link to="/editor/indev"
          >{{ $t("editor.scripts") }}
          <span class="count">{{ editor.scripts.size }}</span></router-link
        >
        <router-link to="/editor/list/doorDescs"
          >{{ $t("editor.doorDescs") }}
          <span class="count">{{ editor.doorDescs.size }}</span></router-link
        >
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { ref } from "vue";
import { useEditorStore } from "@/store/editor";

export default {
  name: "EditorSidebar",
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const expanded = ref(true);
    const editor = useEditorStore();

    return {
      editor,
      expanded,
    };
  },
};
</script>

<style lang="scss" scoped>
.editor-sidebar {
  position: relative;
  background: $editorBg;
  height: 100vh;
  max-width: 20vw;
}

.content {
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease-out;

  &.expanded {
    width: 20vw;
  }
}

.no-project {
  min-width: 20vw;
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: $editorGray;
  width: 0;
  overflow: hidden;
  padding: 0;
  padding: 32px;
}

.expand {
  position: absolute;
  top: calc(50vh - 30px);
  background-color: $editorAccent;
  transition: all 0.3s ease-out;
  right: -35px;
  transform: rotate(180deg);

  &.expanded {
    transform: rotate(0deg);
  }
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 14px 10px;
    border-bottom: solid 1px $editorGray;
    width: 100%;
    text-align: left;
    font-weight: 600;
    color: $editorFg;
    transition: all 0.2s ease;

    &:hover {
      color: $editorBg;
      background: $editorFg;
    }

    .count {
      @include center;
      border-radius: 10px;
      font-weight: normal;
      color: $editorBg;
      background: $editorAccent;
      min-width: 32px;
      height: 24px;
      margin-right: 15px;
    }
  }

  .summary {
    height: 100px;
    width: 20vw;
    padding: 12px;
    padding-bottom: 102px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: solid 1px $editorGray;

    .name {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .uuid,
    .dir {
      color: $editorGray;
      font-size: 14px;
    }
  }
}
</style>
