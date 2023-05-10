<template>
  <div class="object-editor-view eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.animations`) }}</label>
      <EditorAnimationList
        :entity="curEntityObject"
        @select="selectedAnimationId = $event"
        :selected="selectedAnimationId"
      />
    </div>

    <div class="vertical-line" v-if="selectedAnimation != null">
      <label class="eui label">{{ $t(`editor.spritesheet`) }}</label>
      <EditorLink
        :type="ResourceType.ASSET"
        spriteMode
        :res="selectedAnimation.spritesheet"
        @select="setSpritesheet"
        @remove="(selectedAnimation as SpriteAnimation).spritesheet = null"
      />
      <div class="horizontal-line">
        <EditorCheckbox
          v-model="(selectedAnimation as SpriteAnimation).smooth"
        />
        <div class="name">{{ $t('editor.smooth') }}</div>
      </div>
    </div>

    <div class="vertical-line" v-if="selectedAnimation != null">
      <label class="eui label">{{ $t(`editor.label`) }}</label>
      <input
        class="eui input"
        v-model.number="(selectedAnimation as SpriteAnimation).name"
      />
    </div>

    <div class="vertical-line" v-if="selectedAnimation != null">
      <label class="eui label">{{ $t(`editor.frameCount`) }}</label>
      <input
        class="eui input"
        type="number"
        v-model.number="(selectedAnimation as SpriteAnimation).count"
      />
    </div>

    <div class="vertical-line" v-if="selectedAnimation != null">
      <label class="eui label">{{ $t(`editor.animationSpeed`) }}</label>
      <input
        class="eui input"
        type="number"
        step="50"
        v-model.number="(selectedAnimation as SpriteAnimation).speed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorLink from '@/components/editor/ui/EditorLink.vue';
import { EntityObject } from '@/core/classes/game/EntityObject';
import { PropType, ref, computed } from 'vue';
import { SpriteAnimation } from '@/core/classes/game/sub/gfx/SpriteAnimation';
import EditorAnimationList from '@/components/editor/ui/EditorAnimationList.vue';
import { ResourceType } from '@/core/types/game/ResourceType';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';
import { SpriteSource } from '@/core/types/gfx/SpriteSource';

const props = defineProps({
  entityObject: {
    type: Object as PropType<EntityObject>,
    required: true,
  },
});

const curEntityObject = ref(props.entityObject);
const selectedAnimationId = ref(props.entityObject.animations[0]?.id ?? null);
const selectedAnimation = computed(
  () =>
    curEntityObject.value.animations.find(
      (anim) => anim.id == selectedAnimationId.value
    ) ?? null
);

const setSpritesheet = (spritesheet: SpriteSource) => {
  const anim = selectedAnimation.value as SpriteAnimation;
  anim.spritesheet = spritesheet;
  anim.metadata = spritesheet.metadata;
};
</script>

<style lang="scss" scoped>
.horizontal-line {
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
}
</style>
