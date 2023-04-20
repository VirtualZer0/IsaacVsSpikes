<template>
  <div class="events-graph">
    <div class="toolbar">
      <button
        class="eui circleButton"
        :class="event"
        v-for="event in RoomEventType"
        :key="event"
        @click="ghostBlock.type = event"
        v-show="event != RoomEventType.BASE"
      >
        <event-icon style="width: 24px; height: 24px" :type="event" />
        <div class="label">{{ $t(`editor.${event}Event`) }}</div>
      </button>
    </div>

    <div
      class="canvas"
      :class="{ drag: dragMode }"
      @click="acceptAction"
      @mousemove="mouseMove"
      @mousedown="dragMode = true"
      @mouseup="dragMode = false"
      @mouseleave="dragMode = false"
      @contextmenu="stopAction"
      ref="canvas"
    >
      <svg class="links" width="100%" height="100%">
        <line
          class="new"
          v-if="newLink.visible"
          :x1="newLink.inputX"
          :y1="newLink.inputY"
          :x2="newLink.outputX"
          :y2="newLink.outputY"
          stroke-width="3"
        />
        <line
          class="link"
          v-for="link in links"
          :key="link.inputId + link.outputId + link.outputKey"
          :x1="link.inputX"
          :y1="link.inputY"
          :x2="link.outputX"
          :y2="link.outputY"
          stroke-width="3"
          @contextmenu.stop.prevent="breakLink(link)"
        />
      </svg>

      <div class="events">
        <event-element
          v-for="node in curEvents"
          :key="node.id"
          :event="node"
          :x="node.pos.x"
          :y="node.pos.y"
          @start-move="currentDraggable = node"
          @stop-move="currentDraggable = null"
          @input="setPin(node, 'input', $event)"
          @output="setPin(node, 'output', $event)"
          @update-links="updateLinks(node, $event)"
          @edit="editEvent = node"
          @remove="removeNode(node)"
        />
      </div>

      <div
        class="ghost-block"
        v-if="ghostBlock.type"
        :class="ghostBlock.type"
        :style="{
          transform: `translate(${ghostBlock.pos.x}px,${ghostBlock.pos.y}px)`,
        }"
      >
        <span>{{ $t('editor.ghostBlockLBM') }}</span>
        <span>{{ $t('editor.ghostBlockRBM') }}</span>
      </div>
    </div>

    <div class="backdrop" v-if="editEvent" @click="editEvent = null" />
    <div class="event-modal shadow-l2" v-if="editEvent">
      <button class="eui button close" @click="editEvent = null">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </button>
      <component
        :is="`${
          editEvent.type.charAt(0).toUpperCase() + editEvent.type.slice(1)
        }EventEditor`"
        :event="editEvent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { RoomEvent } from '@/core/classes/game/sub/room/RoomEvent';
import { RoomEventType } from '@/core/classes/game/sub/room/RoomEventType';
import { RoomStatsCheckEvent } from '@/core/classes/game/sub/room/RoomStatsCheckEvent';
import { RoomSelectEvent } from '@/core/classes/game/sub/room/RoomSelectEvent';
import { RoomStatsChangeEvent } from '@/core/classes/game/sub/room/RoomStatsChangeEvent';
import { RoomRewardEvent } from '@/core/classes/game/sub/room/RoomRewardEvent';
import { RoomTextEvent } from '@/core/classes/game/sub/room/RoomTextEvent';
import { RoomChanceEvent } from '@/core/classes/game/sub/room/RoomChanceEvent';
import { RoomEffectEvent } from '@/core/classes/game/sub/room/RoomEffectEvent';
import { RoomOrEvent } from '@/core/classes/game/sub/room/RoomOrEvent';
import { RoomCounterEvent } from '@/core/classes/game/sub/room/RoomCounterEvent';

import { reactive, ref } from '@vue/reactivity';
import { defineAsyncComponent, defineComponent, PropType } from 'vue';
import { Coords } from '@/core/classes/base/Coords';
import { v4 as uuid, NIL as nilUUid } from 'uuid';

import EventElement from './EventElement.vue';
import EventIcon from './EventIcon.vue';

/** Событие создания подключения */
type ConnectionEvent = {
  pos: number[];
  key: string;
};

/** Активная связь */
type Link = {
  inputId: string;
  outputId: string;
  outputKey: string;
  inputX: number;
  inputY: number;
  outputX: number;
  outputY: number;
};

export default defineComponent({
  name: 'EventsGraph',
  components: {
    EventElement,
    EventIcon,

    TextEventEditor: defineAsyncComponent(
      () => import('./editors/TextEventEditor.vue')
    ),
    StatscheckEventEditor: defineAsyncComponent(
      () => import('./editors/StatscheckEventEditor.vue')
    ),
    SelectEventEditor: defineAsyncComponent(
      () => import('./editors/SelectEventEditor.vue')
    ),
    ChanceEventEditor: defineAsyncComponent(
      () => import('./editors/ChanceEventEditor.vue')
    ),
    RewardEventEditor: defineAsyncComponent(
      () => import('./editors/RewardEventEditor.vue')
    ),
    StatschangeEventEditor: defineAsyncComponent(
      () => import('./editors/StatschangeEventEditor.vue')
    ),
    EffectEventEditor: defineAsyncComponent(
      () => import('./editors/EffectEventEditor.vue')
    ),
    OrEventEditor: defineAsyncComponent(
      () => import('./editors/OrEventEditor.vue')
    ),
    CounterEventEditor: defineAsyncComponent(
      () => import('./editors/CounterEventEditor.vue')
    ),
  },
  props: {
    events: {
      type: Array as PropType<RoomEvent[]>,
      required: true,
      default: () => [],
    },
  },

  setup(props) {
    const editEvent = ref<RoomEvent | null>(null);
    const curEvents = ref<RoomEvent[]>(props.events);

    /** Полотно */
    const canvas = ref<Nullable<HTMLElement>>(null);
    const currentDraggable = ref<Nullable<RoomEvent>>(null);

    /** Список связей */
    const links = reactive<Link[]>([]);

    /** Текущая позиция мыши */
    const curPos = reactive({
      x: 0,
      y: 0,
    });

    const dragMode = ref(false);

    /** Призрачный блок для отображения места размещения */
    const ghostBlock = reactive<{
      pos: { x: number; y: number };
      type: Nullable<RoomEventType>;
    }>({
      pos: curPos,
      type: null,
    });

    /** Состояние создания новой связи */
    const newLink = reactive({
      visible: false,
      inputId: '',
      outputId: '',
      outputKey: '',
      inputX: 0,
      inputY: 0,
      outputX: 0,
      outputY: 0,
    });

    /** Создание связи между двумя блоками */
    const establishConnection = () => {
      const inputNode = curEvents.value.find(
        (node) => node.id === newLink.inputId
      );
      const outputNode = curEvents.value.find(
        (node) => node.id === newLink.outputId
      );

      if (
        outputNode?.type == RoomEventType.OR &&
        inputNode?.type != RoomEventType.STATSCHECK &&
        inputNode?.type != RoomEventType.COUNTER &&
        newLink.outputKey != 'fail'
      ) {
        alert('Комбинатор может подключаться только к блокам проверок');
        newLink.outputId = '';
        newLink.inputId = '';
        newLink.visible = false;
        return;
      }

      const oldLink = links.find(
        (link) =>
          link.outputId === newLink.outputId &&
          link.outputKey === newLink.outputKey
      );

      if (oldLink) {
        const oldOutputNode = curEvents.value.find(
          (node) => node.id === oldLink.outputId
        );
        const oldInputNode = curEvents.value.find(
          (node) => node.id === oldLink.inputId
        );

        if (oldOutputNode && oldInputNode) {
          oldOutputNode.outputEvents[oldLink.outputKey] = nilUUid;
          oldInputNode.inputEvents = oldInputNode.inputEvents.filter(
            (event) =>
              event.id !== oldLink.inputId && event.key !== oldLink.outputKey
          );
        }

        links.splice(links.indexOf(oldLink), 1);
      }

      if (inputNode && outputNode) {
        inputNode.inputEvents.push({
          id: outputNode.id,
          key: newLink.outputKey,
        });
        outputNode.outputEvents[newLink.outputKey] = inputNode.id;
      }

      links.push({
        inputId: newLink.inputId,
        outputId: newLink.outputId,
        outputKey: newLink.outputKey,
        inputX: newLink.inputX,
        inputY: newLink.inputY,
        outputX: newLink.outputX,
        outputY: newLink.outputY,
      });

      newLink.outputId = '';
      newLink.inputId = '';
      newLink.visible = false;
    };

    /** Удаление события */
    const removeNode = (delNode: RoomEvent) => {
      const index = curEvents.value.indexOf(delNode);

      if (index > -1) {
        curEvents.value.forEach((node) => {
          node.inputEvents = node.inputEvents.filter(
            (ev) => ev.id !== delNode.id
          );

          for (const [key, outputId] of Object.entries(node.outputEvents)) {
            if (outputId === delNode.id) {
              node.outputEvents[key] = nilUUid;
            }
          }
        });

        curEvents.value.splice(index, 1);
      }

      const linksForRemove = [];
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.inputId === delNode.id || link.outputId === delNode.id) {
          linksForRemove.push(i);
        }
      }

      for (let i = linksForRemove.length - 1; i >= 0; i--) {
        links.splice(linksForRemove[i], 1);
      }
    };

    /** Удаление связи */
    const breakLink = (link: Link) => {
      const inputNode = curEvents.value.find(
        (node) => node.id === link.inputId
      );
      const outputNode = curEvents.value.find(
        (node) => node.id === link.outputId
      );

      if (inputNode && outputNode) {
        inputNode.inputEvents = inputNode.inputEvents.filter(
          (ev) => ev.id !== link.outputId || ev.key !== link.outputKey
        );
        outputNode.outputEvents[link.outputKey] = nilUUid;
      }

      const index = links.indexOf(link);
      if (index > -1) {
        links.splice(index, 1);
      }
    };

    /** Обработка перемещений мыши */
    const mouseMove = (e: MouseEvent) => {
      if (!canvas.value) {
        return;
      }

      if (dragMode.value) {
        canvas.value.scrollLeft -= e.movementX;
        canvas.value.scrollTop -= e.movementY;
      }

      const rect = canvas.value.getBoundingClientRect();
      curPos.x = Math.round(e.clientX - rect.left + canvas.value.scrollLeft);
      curPos.y = Math.round(e.clientY - rect.top + canvas.value.scrollTop);

      if (currentDraggable.value) {
        currentDraggable.value.pos.x = curPos.x - 15;
        currentDraggable.value.pos.y = curPos.y + 15;
      }

      if (!newLink.visible) {
        return;
      }

      if (!newLink.inputId && newLink.outputId) {
        newLink.inputX = curPos.x;
        newLink.inputY = curPos.y;
      } else if (newLink.inputId && !newLink.outputId) {
        newLink.outputX = curPos.x;
        newLink.outputY = curPos.y;
      }
    };

    /** Обновление положения связей */
    const updateLinks = (
      node: RoomEvent,
      pins: { input: Coords; outputs: { key: string; x: number; y: number }[] }
    ) => {
      if (!canvas.value) {
        return;
      }

      const inputLinks = links.filter((link) => link.inputId === node.id);
      const outputLinks = links.filter((link) => link.outputId === node.id);

      inputLinks.forEach((link) => {
        link.inputX = pins.input.x + node.pos.x;
        link.inputY = pins.input.y + node.pos.y;
      });

      outputLinks.forEach((link) => {
        pins.outputs.forEach((output) => {
          if (link.outputKey === output.key) {
            link.outputX = output.x + node.pos.x;
            link.outputY = output.y + node.pos.y;
          }
        });
      });
    };

    /** Остановка текущих активных действий */
    const stopAction = (e: MouseEvent) => {
      ghostBlock.type = null;
      newLink.visible = false;
      newLink.inputId = '';
      newLink.outputId = '';
      e.stopPropagation();
      e.preventDefault();
    };

    /** Применение результата активных действий (установка нового блока) */
    const acceptAction = (e: MouseEvent) => {
      if (ghostBlock.type) {
        let newEvent: RoomEvent;

        switch (ghostBlock.type) {
          case RoomEventType.STATSCHECK:
            (newEvent = new RoomStatsCheckEvent()).id = uuid();
            break;
          case RoomEventType.STATSCHANGE:
            (newEvent = new RoomStatsChangeEvent()).id = uuid();
            break;
          case RoomEventType.REWARD:
            (newEvent = new RoomRewardEvent()).id = uuid();
            break;
          case RoomEventType.SELECT:
            (newEvent = new RoomSelectEvent()).id = uuid();
            break;
          case RoomEventType.TEXT:
            (newEvent = new RoomTextEvent()).id = uuid();
            break;
          case RoomEventType.CHANCE:
            (newEvent = new RoomChanceEvent()).id = uuid();
            break;
          case RoomEventType.EFFECT:
            (newEvent = new RoomEffectEvent()).id = uuid();
            break;
          case RoomEventType.OR:
            (newEvent = new RoomOrEvent()).id = uuid();
            break;
          case RoomEventType.COUNTER:
            (newEvent = new RoomCounterEvent()).id = uuid();
            break;
          default:
            return;
        }

        newEvent.pos = { ...curPos };
        curEvents.value.push(newEvent);

        ghostBlock.type = null;
      }

      e.stopPropagation();
      e.preventDefault();
    };

    /** Обработка процесса создания новой связи */
    const setPin = (
      node: RoomEvent,
      pin: 'input' | 'output',
      ev: ConnectionEvent
    ) => {
      if (!canvas.value) {
        return;
      }

      const rect = canvas.value.getBoundingClientRect();

      newLink.visible = true;
      newLink[`${pin}Id`] = node.id;
      newLink[`${pin}X`] = ev.pos[0] - rect.left + canvas.value.scrollLeft;
      newLink[`${pin}Y`] = ev.pos[1] - rect.top + canvas.value.scrollTop;

      if (pin === 'output') {
        newLink.outputKey = ev.key;
      }

      const nPin: 'input' | 'output' = pin == 'input' ? 'output' : 'input';

      if (newLink[`${nPin}Id`]) {
        const event = curEvents.value.find(
          (node) => node.id === newLink[`${nPin}Id`]
        );

        if (!event) {
          return;
        }

        establishConnection();
      } else {
        newLink[`${nPin}X`] = curPos.x;
        newLink[`${nPin}Y`] = curPos.y;
      }
    };

    /** Восстановление сохраненных связей */
    curEvents.value.forEach((outputNode) => {
      for (const [key, value] of Object.entries(outputNode.outputEvents)) {
        const inputNode = curEvents.value.find((node) => node.id === value);
        if (inputNode) {
          links.push({
            inputId: inputNode.id,
            outputId: outputNode.id,
            outputKey: key,
            inputX: 0,
            inputY: 0,
            outputX: 0,
            outputY: 0,
          });
        }
      }
    });

    return {
      canvas,
      links,
      RoomEventType,
      newLink,
      ghostBlock,
      currentDraggable,
      mouseMove,
      dragMode,
      stopAction,
      acceptAction,
      setPin,
      updateLinks,
      removeNode,
      breakLink,
      editEvent,
      curEvents,
    };
  },
});
</script>

<style lang="scss" scoped>
.events-graph {
  width: 100%;
  height: 100%;
  min-height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  .toolbar {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 12px;
    bottom: 20px;
    left: 10px;
    z-index: 10;

    .circleButton {
      position: relative;
      background: $editorAccent;
      width: 48px;
      height: 48px;

      .label {
        width: 0;
        position: absolute;
        left: 0;
        color: $editorFg;
        font-weight: bold;
        overflow: hidden;
        transition: all 0.2s ease;
        z-index: -1;
        text-align: left;
        white-space: nowrap;
      }

      &:hover {
        .label {
          width: 150px;
          left: 58px;
        }
      }

      &.text {
        background: #4caf50;
      }
      &.dialog {
        background: #00bcd4;
      }
      &.statscheck {
        background: #3f51b5;
      }
      &.reward {
        background: #673ab7;
      }
      &.statschange {
        background: #f4511e;
      }
      &.chance {
        background: #fbc02d;
      }
      &.effect {
        background: #d81b60;
      }
      &.or {
        background: #757575;
      }

      &.counter {
        background: #ff9800;
      }
    }
  }

  .canvas {
    position: relative;
    overflow: auto;
    flex-grow: 1;

    &.drag {
      cursor: grabbing;
    }

    .events,
    .links {
      top: 0;
      left: 0;
      will-change: transform;
      backface-visibility: hidden;
      position: absolute;
      width: 5000px;
      height: 5000px;

      line {
        stroke: $editorFg;
        cursor: pointer;

        &.new {
          stroke: $editorGray;
        }

        &:hover.link {
          stroke: $editorAccent;
        }
      }
    }

    .events {
      pointer-events: none;
    }
  }

  .ghost-block {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 75px;
    border: 2px solid $editorGray;
    @include center;
    font-size: 12px;
    flex-direction: column;
    pointer-events: none;
    gap: 8px;
    background-color: rgba(128, 128, 128, 0.2);
    will-change: transform;
    backface-visibility: hidden;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 19;
    background-color: rgba(128, 128, 128, 0.5);
  }

  .event-modal {
    position: absolute;
    overflow: auto;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    background: $editorPaper;
    z-index: 20;

    .close {
      width: 32px;
      height: 32px;
      position: absolute;
      right: 12px;
      top: 12px;
      padding: 0;

      &:hover {
        svg {
          fill: $editorBg;
        }
      }
    }
  }
}
</style>
