<template>
  <div class="events-graph">

    <div class="toolbar">
      <button class="eui circleButton" :class="event" v-for="event in RoomEventType" :key="event" @click="ghostBlock.type = event" v-show="event != RoomEventType.BASE">
        <event-icon style="width: 24px; height: 24px;" :type="event"/>
        <div class="label">{{$t(`editor.${event}Event`)}}</div>
      </button>
    </div>

    <div
      class="canvas"
      @click="acceptAction"
      @mousemove="mouseMove"
      @contextmenu="stopAction"
      ref="canvas">

      <svg class="links" width="100%" height="100%">
        <line class="new" v-if="newLink.visible" :x1="newLink.inputX" :y1="newLink.inputY" :x2="newLink.outputX" :y2="newLink.outputY" stroke-width="3"/>
        <line class="link"
          v-for="link in links"
          :key="link.inputId+link.outputId+link.outputKey"
          :x1="link.inputX" :y1="link.inputY"
          :x2="link.outputX" :y2="link.outputY"
          stroke-width="3"
          @contextmenu="breakLink(link)"/>
      </svg>

      <div class="events">

        <event-element
          v-for="node in nodemap"
          :key="node.event.id"
          :event="node.event"
          :x="node.x"
          :y="node.y"
          @start-move="currentDraggable = node"
          @stop-move="currentDraggable = null"
          @input="setPin(node, 'input', $event)"
          @output="setPin(node, 'output', $event)"
          @update-links="updateLinks(node, $event)"
          @edit="editEvent = node.event"
          @remove="removeNode(node)"/>

      </div>

      <div
        class="ghost-block"
        v-if="ghostBlock.type"
        :class="ghostBlock.type"
        :style="{transform: `translate(${ghostBlock.pos.x}px,${ghostBlock.pos.y}px)`}">

        <span>{{$t('editor.ghostBlockLBM')}}</span>
        <span>{{$t('editor.ghostBlockRBM')}}</span>

      </div>
    </div>

    <div class="backdrop" v-if="editEvent" @click="editEvent = null"/>
    <div class="event-modal shadow-l2" v-if="editEvent">
      <button class="eui button close" @click="editEvent = null">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
      <component
        :is="`${editEvent.type.charAt(0).toUpperCase() + editEvent.type.slice(1)}EventEditor`" :event="editEvent"/>
    </div>

  </div>
</template>

<script lang="ts">

import { RoomEvent } from "@/core/classes/game/sub/room/RoomEvent";
import { RoomEventType } from "@/core/classes/game/sub/room/RoomEventType";
import { RoomStatsCheckEvent } from "@/core/classes/game/sub/room/RoomStatsCheckEvent";
import { RoomSelectEvent } from "@/core/classes/game/sub/room/RoomSelectEvent";
import { RoomStatsChangeEvent } from "@/core/classes/game/sub/room/RoomStatsChangeEvent";
import { RoomRewardEvent } from "@/core/classes/game/sub/room/RoomRewardEvent";
import { RoomTextEvent } from "@/core/classes/game/sub/room/RoomTextEvent";
import { RoomChanceEvent } from "@/core/classes/game/sub/room/RoomChanceEvent";

import { reactive, ref } from "@vue/reactivity";
import { defineAsyncComponent, defineComponent, PropType,  watch } from "vue";
import { Coords } from "@/core/classes/base/Coords";
import { v4 as uuid, NIL as nilUUid } from 'uuid'

import EventElement from "./EventElement.vue";
import EventIcon from "./EventIcon.vue";
import { useEditorStore } from "@/store/editor";
import { RoomSoundEvent } from "@/core/classes/game/sub/room/RoomSoundEvent";

/** Нода графа */
type Node = {
  event: RoomEvent;
  x: number;
  y: number;
};

/** Событие создания подключения */
type ConnectionEvent = {
  pos: number[],
  key: string
}

/** Активная связь */
type Link = {
  inputId: string;
  outputId: string;
  outputKey: string;
  inputX: number;
  inputY: number;
  outputX: number;
  outputY: number;
}

export default defineComponent({
  name: 'EventsGraph',
  components: {
    EventElement,
    EventIcon,

    TextEventEditor: defineAsyncComponent(() => import("./editors/TextEventEditor.vue")),
    StatscheckEventEditor: defineAsyncComponent(() => import("./editors/StatscheckEventEditor.vue")),
    SelectEventEditor: defineAsyncComponent(() => import("./editors/SelectEventEditor.vue")),
    ChanceEventEditor: defineAsyncComponent(() => import("./editors/ChanceEventEditor.vue")),
    RewardEventEditor: defineAsyncComponent(() => import("./editors/RewardEventEditor.vue")),
    StatschangeEventEditor: defineAsyncComponent(() => import("./editors/StatschangeEventEditor.vue")),
    SoundEventEditor: defineAsyncComponent(() => import("./editors/SoundEventEditor.vue")),
  },
  props: {
    events: {
      type: Array as PropType<RoomEvent[]>,
      required: true,
      default: () => []
    },

    nodes: {
      type: Object as PropType<Map<string, number[]>>,
      required: true,
      default: () => new Map()
    }
  },

  setup(props) {
    const editor = useEditorStore();
    const editEvent = ref<RoomEvent | null>(null);

    /** Полотно */
    const canvas = ref<Nullable<HTMLElement>>(null);
    const currentDraggable = ref<Nullable<Node>>(null);

    /** Список связей */
    const links = reactive<Link[]>([]);

    /** Список нод */
    const nodemap = editor.temporaryNodemap = reactive(props.events.map(event => {
      const pos = props.nodes.get(event.id);
      return {
        event: event,
        x: pos ? pos[0] : 0,
        y: pos ? pos[1] : 0
      }
    }));

    /** Текущая позиция мыши */
    const curPos = reactive({
      x: 0,
      y: 0
    });

    /** Призрачный блок для отображения места размещения */
    const ghostBlock = reactive<{pos: {x: number, y: number}, type: Nullable<RoomEventType>}>({
      pos: curPos,
      type: null
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
      outputY: 0
    });

    /** Создание связи между двумя блоками */
    const establishConnection = () => {

      const inputNode = nodemap.find(node => node.event.id === newLink.inputId);
      const outputNode = nodemap.find(node => node.event.id === newLink.outputId);

      const oldLink = links.find(link => link.outputId === newLink.outputId && link.outputKey === newLink.outputKey);

      if (oldLink) {
        const oldOutputNode = nodemap.find(node => node.event.id === oldLink.outputId);
        const oldInputNode = nodemap.find(node => node.event.id === oldLink.inputId);

        if (oldOutputNode && oldInputNode) {
          oldOutputNode.event.outputEvents[oldLink.outputKey] = nilUUid;
          oldInputNode.event.inputEvents = oldInputNode.event.inputEvents
            .filter(event => event.id !== oldLink.inputId && event.key !== oldLink.outputKey);
        }


        links.splice(links.indexOf(oldLink), 1);
      }

      if (inputNode && outputNode) {
        inputNode.event.inputEvents.push({id: outputNode.event.id, key: newLink.outputKey});
        outputNode.event.outputEvents[newLink.outputKey] = inputNode.event.id;
      }

      links.push({
        inputId: newLink.inputId,
        outputId: newLink.outputId,
        outputKey: newLink.outputKey,
        inputX: newLink.inputX,
        inputY: newLink.inputY,
        outputX: newLink.outputX,
        outputY: newLink.outputY
      });

      newLink.outputId = '';
      newLink.inputId = '';
      newLink.visible = false;
    };

    /** Удаление события */
    const removeNode = (delNode: Node) => {
      const index = nodemap.indexOf(delNode);

      if (index > -1) {
        nodemap.forEach(node => {
          node.event.inputEvents = node.event.inputEvents.filter(ev => ev.id !== delNode.event.id);

          for (const [key, outputId] of Object.entries(node.event.outputEvents)) {
            if (outputId === delNode.event.id) {
              node.event.outputEvents[key] = nilUUid;
            }
          }

        });

        nodemap.splice(index, 1)
      }

      const linksForRemove = [];
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.inputId === delNode.event.id || link.outputId === delNode.event.id) {
          linksForRemove.push(i);
        }
      }

      for (let i = linksForRemove.length - 1; i >= 0; i--) {
        links.splice(linksForRemove[i], 1);
      }
    };

    /** Удаление связи */
    const breakLink = (link: Link) => {
      const inputNode = nodemap.find(node => node.event.id === link.inputId);
      const outputNode = nodemap.find(node => node.event.id === link.outputId);

      if (inputNode && outputNode) {
        inputNode.event.inputEvents = inputNode.event.inputEvents.filter(ev => ev.id !== link.outputId || ev.key !== link.outputKey);
        outputNode.event.outputEvents[link.outputKey] = nilUUid;
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

      const rect = canvas.value.getBoundingClientRect();
      curPos.x = e.clientX - rect.left + canvas.value.scrollLeft;
      curPos.y = e.clientY - rect.top + canvas.value.scrollTop;

      if (currentDraggable.value) {
        currentDraggable.value.x = curPos.x - 15;
        currentDraggable.value.y = curPos.y + 15;
      }

      if (!newLink.visible) {
        return;
      }

      if (!newLink.inputId && newLink.outputId) {
        newLink.inputX = curPos.x;
        newLink.inputY = curPos.y;
      }
      else if (newLink.inputId && !newLink.outputId) {
        newLink.outputX = curPos.x;
        newLink.outputY = curPos.y;
      }
    }

    /** Обновление положения связей */
    const updateLinks = (node: Node, pins: {input: Coords, outputs: {key: string, x: number, y: number}[]}) => {
      if (!canvas.value) {
        return;
      }

      const inputLinks = links.filter(link => link.inputId === node.event.id);
      const outputLinks = links.filter(link => link.outputId === node.event.id);

      inputLinks.forEach(link => {
        link.inputX = pins.input.x + node.x;
        link.inputY = pins.input.y + node.y;
      });

      outputLinks.forEach(link => {
        pins.outputs.forEach(output => {
          if (link.outputKey === output.key) {
            link.outputX = output.x + node.x;
            link.outputY = output.y + node.y;
          }
        });
      });
    }

    /** Остановка текущих активных действий */
    const stopAction = (e: MouseEvent) => {
      ghostBlock.type = null;
      newLink.visible = false;
      newLink.inputId = '';
      newLink.outputId = '';
      e.stopPropagation();
      e.preventDefault();
    }

    /** Применение результата активных действий (установка нового блока) */
    const acceptAction = (e: MouseEvent) => {
      if (ghostBlock.type) {

        let newEvent: RoomEvent;

        switch(ghostBlock.type) {
          case RoomEventType.STATSCHECK: (newEvent = new RoomStatsCheckEvent()).id = uuid(); break;
          case RoomEventType.STATSCHANGE: (newEvent = new RoomStatsChangeEvent()).id = uuid(); break;
          case RoomEventType.REWARD: (newEvent = new RoomRewardEvent()).id = uuid(); break;
          case RoomEventType.SELECT: (newEvent = new RoomSelectEvent()).id = uuid(); break;
          case RoomEventType.TEXT : (newEvent = new RoomTextEvent()).id = uuid(); break;
          case RoomEventType.CHANCE : (newEvent = new RoomChanceEvent()).id = uuid(); break;
          case RoomEventType.SOUND: (newEvent = new RoomSoundEvent()).id = uuid(); break;
          default: return;
        }

        nodemap.push({
          event: newEvent,
          x: curPos.x,
          y: curPos.y
        });

        ghostBlock.type = null;
      }

      e.stopPropagation();
      e.preventDefault();
    }

    /** Обработка процесса создания новой связи */
    const setPin = (node: Node, pin: 'input' | 'output', ev: ConnectionEvent) => {

      if (!canvas.value) {
        return;
      }

      const rect = canvas.value.getBoundingClientRect();

      newLink.visible = true;
      newLink[`${pin}Id`] = node.event.id;
      newLink[`${pin}X`] = ev.pos[0] - rect.left + canvas.value.scrollLeft;
      newLink[`${pin}Y`] = ev.pos[1] - rect.top + canvas.value.scrollTop;

      if (pin === 'output') {
        newLink.outputKey = ev.key;
      }

      let nPin: 'input' | 'output' = pin == 'input' ? 'output' : 'input';

      if(newLink[`${nPin}Id`]) {

        const event = nodemap.find(node => node.event.id === newLink[`${nPin}Id`])?.event;

        if(!event) {
          return;
        }

        establishConnection();
      }
      else {
        newLink[`${nPin}X`] = curPos.x;
        newLink[`${nPin}Y`] = curPos.y;
      }

    }

    /** Восстановление сохраненных связей */
    nodemap.forEach(outputNode => {
      for(const [key, value] of Object.entries(outputNode.event.outputEvents)) {
        const inputNode = nodemap.find(node => node.event.id === value);
        if (inputNode) {
          links.push({
            inputId: inputNode.event.id,
            outputId: outputNode.event.id,
            outputKey: key,
            inputX: 0,
            inputY: 0,
            outputX: 0,
            outputY: 0
          });
        }
      }
    });

    return {
      canvas, nodemap, links, RoomEventType,
      newLink, ghostBlock, currentDraggable,
      mouseMove, stopAction, acceptAction,
      setPin, updateLinks, removeNode, breakLink,
      editEvent,
    }
  }
})
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
        transition: all .2s ease;
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

      &.text { background: #4CAF50; }
      &.dialog { background: #00BCD4; }
      &.statscheck { background: #3F51B5; }
      &.reward { background: #673AB7; }
      &.statschange { background: #F4511E; }
      &.chance { background: #FBC02D; }
      &.sound { background: #D81B60; }
    }
  }

  .canvas {
    position: relative;
    overflow: auto;
    flex-grow: 1;

    .events, .links {
      top: 0;
      left: 0;
      will-change: transform;
      backface-visibility: hidden;
      position: absolute;
      width: 5000px;
      height: 5000px;

      line {
        stroke: $editorFg;

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
    background-color: rgba(128,128,128,0.2);
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
    background-color: rgba(128,128,128,0.5);
  }

  .event-modal {
    position: absolute;
    overflow:auto;
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
        svg {fill: $editorBg;}
      }
    }
  }
}
</style>