<template>
  <div>
    <div
      class="sprite"
      ref="spriteEl"
      :style="{
        backgroundImage: imgUrl,
        backgroundSize: `${animation.count}00% ${
          saveAspect && height ? 'auto' : height + 'px'
        }`,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        imageRendering: animation.smooth ? 'auto' : 'pixelated',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ResourceLink } from '@/core/classes/base/ResourceLink';
import { SpriteAnimation } from '@/core/classes/game/sub/gfx/SpriteAnimation';
import { core } from '@/core/Core';
import { useEditorStore } from '@/store/editor';
import { watch } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, PropType, ref } from 'vue';

const props = defineProps({
  animation: {
    type: Object as PropType<SpriteAnimation>,
    default: () => ({}),
  },

  startFrame: {
    type: Number,
    default: 0,
  },

  width: {
    type: Number,
    default: 0,
  },

  height: {
    type: Number,
    default: 0,
  },

  oneFrameTick: {
    type: Boolean,
    default: false,
  },

  static: {
    type: Boolean,
    default: false,
  },

  saveAspect: {
    type: Boolean,
    default: true,
  },
});
let frame = 0;
const imgUrl = ref('');
const curAnim = ref(props.animation);
const spriteEl = ref<HTMLElement | null>(null);
let lastDelta = 0;

const resolveResourceLink = async (link: string | ResourceLink | undefined) => {
  if (typeof link === 'string') return link;
  if (!link) return '/assets/gfx/null.png';

  const editor = useEditorStore();
  const res = editor.assets.get(link.id);
  if (!editor.fs || !res) {
    return '/assets/gfx/null.png';
  }
  return (
    (await res?.getFile(await editor.fs.getDirectory('assets')))?.getUrl() ??
    '/assets/gfx/null.png'
  );
};

watch(
  () => curAnim.value.spritesheet?.src,
  async () => {
    imgUrl.value = `url(${await resolveResourceLink(
      curAnim.value.spritesheet?.src
    )})`;
    console.log(imgUrl.value);
  }
);

const tick = (delta: number): void => {
  if (delta - lastDelta < curAnim.value.speed) return;
  if (frame >= curAnim.value.count - 1) frame = 0;
  else frame++;

  lastDelta = delta;
  (spriteEl.value as HTMLElement).style.backgroundPositionX =
    (frame / (curAnim.value.count - 1 || 1)) * 100 + '%';
};

onBeforeMount(async () => {
  imgUrl.value = `url(${await resolveResourceLink(
    curAnim.value.spritesheet?.src
  )})`;
});

onMounted(() => {
  if ((curAnim.value.count > 1 || props.oneFrameTick) && !props.static) {
    core.spriteManager.addSprite(tick);
  }
});

onBeforeUnmount(() => {
  if ((curAnim.value.count > 1 || props.oneFrameTick) && !props.static) {
    core.spriteManager.removeSprite(tick);
  }
});
</script>

<style lang="scss" scoped>
.sprite {
  background-repeat: no-repeat;
  background-position-y: center;
}

@keyframes sprite {
  to {
    background-position: 200%;
  }
}
</style>
