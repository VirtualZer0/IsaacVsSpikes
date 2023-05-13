<template>
  <div class="character-editor-view eui edit-form">
    <div class="vertical-line">
      <label class="eui label">{{ $t(`editor.animations`) }}</label>
      <EditorAnimationList
        :entity="curCharacter"
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
        @select="(selectedAnimation as SpriteAnimation).spritesheet = $event"
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
import { Character } from '@/core/classes/game/resources/Character';
import { PropType, ref, computed, reactive } from 'vue';
import { SpriteAnimation } from '@/core/classes/game/resources/sub/gfx/SpriteAnimation';
import EditorAnimationList from '@/components/editor/ui/EditorAnimationList.vue';
import { ResourceType } from '@/core/types/game/ResourceType';
import EditorCheckbox from '@/components/editor/ui/EditorCheckbox.vue';

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const curCharacter = reactive(props.character);
const selectedAnimationId = ref(props.character.animations[0]?.id ?? null);
const selectedAnimation = computed(
  () =>
    curCharacter.animations.find(
      (anim) => anim.id == selectedAnimationId.value
    ) ?? null
);
</script>

<style lang="scss" scoped>
.horizontal-line {
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
}
</style>
