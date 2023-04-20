<template>
  <main>
    <h1>Библиотека ресурсов</h1>
    <h2>Предметы</h2>
    <div class="lib-container">
      <div class="item" v-for="[id, item] in library.items" :key="id">
        <sprite :src="item.sprite" :width="5" :height="5" relative />
        <div class="params">
          <div class="name">{{ item.name.ru }}</div>
          <div class="param">ID: {{ id }}</div>
          <div class="param">Пул: {{ ItemPool[item.pool] }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { library } from '@/core/Core';
import { defineComponent } from 'vue';
import Sprite from '@/components/gfx/Sprite.vue';
import { ItemPool } from '@/core/types/game/ItemPool';

export default defineComponent({
  name: 'DevLibraryPage',
  components: { Sprite },
  setup() {
    return { library, ItemPool };
  },
});
</script>
<style lang="scss" scoped>
main {
  padding: 20px;
}

.lib-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.item {
  display: flex;
  width: 25vw;
  padding: 8px;
  border: 2px dashed #888;

  .params {
    text-align: left;
  }

  .name {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .sprite {
    margin-right: 32px;
  }
}
</style>
