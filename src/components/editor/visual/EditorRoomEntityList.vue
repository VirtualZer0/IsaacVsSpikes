<template>
  <div class="entity-list" :class="{ hidden: !showPanel }">
    <div class="entity-list-top">
      <div class="current-path">
        <div class="current-path-item">
          {{ $t('editor.root') }}
        </div>
        <div class="current-path-item" v-for="frag in selectedPath" :key="frag">
          <div class="delimiter">/</div>
          {{ $t(`editor.${frag}`) }}
        </div>
      </div>
      <div class="search">
        <svg
          style="width: 21px; height: 21px; margin-bottom: -5px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
        <input type="text" class="eui input simple" v-model="searchString" />
      </div>
    </div>
    <div
      @click="showPanel = !showPanel"
      class="eui circleButton expand"
      :class="{ hidden: !showPanel }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z"
        />
      </svg>
    </div>
    <div class="entity-list-table">
      <div
        v-if="selectedPath.length > 0"
        class="entity-item"
        @click="selectItem({ name: 'up' })"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M16 18H18V22H20V18H22L19 15L16 18Z"
          />
        </svg>
        <div class="name">{{ $t('editor.back') }}</div>
      </div>
      <div
        class="entity-item"
        v-for="item in selectedItem?.children"
        :key="item.name"
        @click="selectItem(item)"
      >
        <div class="name">
          {{
            item.children
              ? $t(`editor.${item.name}`)
              : item.entity?.getDisplayName()
          }}
        </div>
        <Suspense v-if="item.entity">
          <Sprite
            class="preview"
            :animation="Object.values(item.entity.animations)[0]"
            :width="64"
            :height="64"
            static
          />
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sprite from '@/components/gfx/Sprite.vue';
import { Entity } from '@/core/classes/base/Entity';
import { Monster } from '@/core/classes/game/Monster';
import { library } from '@/core/Core';
import { ResourceType } from '@/core/types/game/ResourceType';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface IMenuItem {
  name?: string;
  children?: IMenuItem[];
  entity?: Entity;
}

const menu = reactive<IMenuItem>({
  name: 'root',
  children: [
    {
      name: 'monsters',
      children: [
        ...library.getResourcesByType<Monster>(ResourceType.MONSTER),
      ].map((child) => ({
        name: child[1].getDisplayName(),
        entity: child[1],
      })),
    },
    {
      name: 'objects',
      children: [],
    },
    {
      name: 'special',
      children: [],
    },
  ],
});

const selectedPath = ref<string[]>([]);
const searchString = ref('');
const selectedItem = computed(() => {
  let item = menu;
  selectedPath.value.forEach((path) => {
    item = item.children?.find((item) => item.name === path) as IMenuItem;
  });

  if (searchString.value && item.children) {
    const filteredChildren = item.children.filter(
      (child) =>
        t(`editor.${child.name}` || '')
          .toLowerCase()
          .includes(searchString.value.toLowerCase()) ||
        child.entity?.isMatch(searchString.value)
    );
    return { ...item, children: filteredChildren };
  } else {
    return item;
  }
});

const emits = defineEmits(['selectEntity']);

const selectItem = (item: IMenuItem) => {
  if (item.name === 'up') {
    return selectedPath.value.pop();
  }
  if (item.children) {
    selectedPath.value.push(item.name as string);
  } else if (item.entity) {
    emits('selectEntity', item.entity);
  }
};

const showPanel = ref(false);
</script>
<style lang="scss" scoped>
.entity-list {
  height: 450px;
  max-height: 450px;
  padding: 24px;
  padding-top: 12px;
  transition: all 0.3s ease;
  background: $editorPaper;
  &.hidden {
    margin-bottom: -36px;
    height: 0px;
  }

  &-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
  }
}

.search {
  .input {
    height: unset;
    margin-left: 4px;
  }
}
.entity-list-table {
  display: flex;
  gap: 12px;
  height: inherit;
  overflow: overlay;
  padding-top: 8px;
  padding-left: 8px;
}

.current-path {
  display: flex;
  font-weight: bold;
  gap: 8px;

  &-item {
    display: flex;
    gap: 8px;
  }
}

.entity-item {
  @include center;
  background: $editorBg;
  flex-direction: column-reverse;
  padding: 12px;
  width: 180px;
  height: 120px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 18px;
  text-decoration: none;
  @extend .shadow-l1;

  &:hover {
    transform: scale(1.05);
    @extend .shadow-l2;
  }

  .preview {
    width: 64px;
    height: 64px;
    margin-bottom: 8px;
  }
}

.expand {
  position: absolute;
  width: 48px;
  height: 48px;
  left: calc(50% - 60px);
  top: -32px;
  border: none;
  background: $editorAccent;
  transition: transform 0.3s ease;

  &.hidden {
    transform: rotate(180deg);
  }

  svg {
    height: 24px;
    fill: $editorBg;
  }
}
</style>
