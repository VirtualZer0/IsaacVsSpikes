<template>
  <div class="event-element" :style="{transform: `translate(${x}px, ${y}px`, height: `${height}px`}" @click="emit('edit')">

    <div class="header" :class="{visible: isDragging}" @click.stop="">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="control drag" @mousedown="emit('startMove', $event); isDragging = true" @mouseup="emit('stopMove');  isDragging = false">
        <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
      </svg>

      <svg style="width:22px;height:22px" viewBox="0 0 24 24" class="control" @click="emit('remove')">
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>
    </div>

    <!-- Иконка типа -->
    <event-icon style="width: 24px; height: 24px;" :type="event.type"></event-icon>

    <div class="name">
      {{event.getDisplayName()}}
    </div>
    <div class="input" @click.stop="setPin('input', $event)" ref="inputPin"/>
    <div class="outputs">
      <div class="output" v-for="output in Object.keys(event.outputEvents)" :key="output" :class="output" :data-pinkey="output"  @click.stop="setPin('output', $event, output)" :ref="setOutputPin">
        <div class="label">{{output}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, onUpdated, PropType, ref } from "vue";
import { RoomEventType } from "@/core/classes/game/sub/room/RoomEventType";
import { RoomEvent } from '@/core/classes/game/sub/room/RoomEvent';
import { computed } from "@vue/reactivity";
import { Coords } from "@/core/classes/base/Coords";

import EventIcon from "./EventIcon.vue";

export default defineComponent({
  name: 'EventElement',
  components: {
    EventIcon
  },
  emits: [
    'input',
    'output',
    'startMove',
    'updateLinks',
    'stopMove',
    'remove',
    'edit'
  ],
  props: {
    event: {
      type: Object as PropType<RoomEvent>,
      required: true
    },

    x: {
      type: Number as PropType<number>,
      required: true
    },

    y: {
      type: Number as PropType<number>,
      required: true
    }
  },

  setup(props, { emit }) {

    const isDragging = ref(false);
    const height = computed(() => {
      return Object.keys(props.event.outputEvents).length * 20 + 20;
    });

    const inputPin = ref<Nullable<HTMLElement>>(null);
    const outputPins = ref<HTMLElement[]>([]);

    const setOutputPin = (pin: any) => {
      if (!pin) {
        return;
      }
      outputPins.value.push(pin as HTMLElement);
    };

    onBeforeUpdate(() => {
      outputPins.value = [];
    });

    const updateLinks = () => {
      if(!inputPin.value) {
        return;
      }

      emit('updateLinks', {
        input: {
          x: inputPin.value.offsetLeft + inputPin.value.offsetWidth / 2,
          y: inputPin.value.offsetTop + inputPin.value.offsetHeight / 2,
        },
        outputs: outputPins.value.map((outputPin: HTMLElement) => {
          return {
            key: outputPin.dataset.pinkey as string,
            x: outputPin.offsetLeft + (outputPin.parentElement as HTMLElement).offsetLeft + outputPin.offsetWidth / 2,
            y: outputPin.offsetTop + (outputPin.parentElement as HTMLElement).offsetTop + outputPin.offsetHeight / 2
          }
        })
      });
    };


    // Отправка данных о расположении текущих пинов
    onUpdated(() => {
      updateLinks();
    });

    onMounted(() => {
      updateLinks();
    });

    const setPin = (pin: 'input' | 'output', e: MouseEvent, key = '') => {
      if (!e.target) {
        return;
      }
      const pinEl = e.target as HTMLElement;
      const rect = pinEl.getBoundingClientRect();

      emit(pin, {
        key,
        pos: [
          rect.left + (pin == 'input' ? pinEl.offsetWidth : 12),
          rect.top + (pin == 'input' ? 16 : 9),
        ]
      });
    };

    return {
      RoomEventType,
      height,
      setPin,
      emit,
      inputPin,
      setOutputPin,
      isDragging
    }

  }
})
</script>

<style lang="scss">
.event-element {
  user-select: none;
  pointer-events: all;
  position: absolute;
  width: 160px;
  min-height: 75px;
  border: 2px solid $editorFg;
  background: $editorBg;
  cursor: pointer;
  @include center;
  flex-direction: column;
  gap: 4px;

  .header {
    overflow: hidden;
    position: absolute;
    height: 0px;
    width: calc(100% + 4px);
    background: $editorFg;
    top: -2px;
    padding: 0 4px;
    transition: all .2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;

    .control {
      fill: $editorBg;
      cursor: pointer;
    }

    .drag {
      cursor: move;
    }

    &.visible {
      height: 26px;
      top: -26px;
    }
  }

  &:hover {
    .header {
      height: 26px;
      top: -26px;
    }
  }

  .name {
    padding: 0 6px;
    overflow: hidden;
    overflow-wrap: break-word;
    max-height: 36px;
  }

  .input {
    position: absolute;
    width: 14px;
    height: 14px;
    left: -7px;
    background: #42A5F5;
    border: 2px solid $editorFg;
    transform: rotate(45deg);
    transition: all .1s ease;
    cursor: crosshair;

    &:hover {
      transform: rotate(45deg) scale(1.5);
    }
  }

  .outputs {
    position: absolute;
    right: -7px;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 10px;
  }

  .output {
    width: 14px;
    height: 14px;
    background: #FFA726;
    border: 2px solid $editorFg;
    transition: all .1s ease;
    cursor: crosshair;

    .label {
      left: 15px;
      display: none;
      position: absolute;
      overflow: hidden;
      font-size: 8px;
      font-weight: bold;
      text-align: center;
      background: $editorFg;
      color: $editorBg;
      border-radius: 4px;
      padding: 1px 4px;
    }

    &:hover {
      transform: scale(1.5);

      .label {
        display: block;
      }
    }

    &.fail {
      background: #EF5350;
    }

    &.success {
      background: #66BB6A;
    }

    &.next {
      background: #7E57C2;
    }
  }
}
</style>