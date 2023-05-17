<template>
  <div class="main-menu">
    <div class="rays" />
    <img class="logo" src="/assets/gfx/ui/logo.webp" />
    <div class="main-menu-buttons">
      <MainMenuButton :rotation="-2">Новая игра</MainMenuButton>
      <MainMenuButton :rotation="1">Бестиарий</MainMenuButton>
      <MainMenuButton :rotation="-1">Настройки</MainMenuButton>
      <MainMenuButton :rotation="2" to="/editor">Редактор</MainMenuButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import MainMenuButton from '@/components/game/menu/MainMenuButton.vue';
</script>
<style lang="scss" scoped>
.main-menu {
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;

  .logo {
    height: 25vh;
    margin-top: 3vh;
    margin-bottom: 10vh;
    animation: logo-floating 1.5s ease-in-out infinite alternate;
  }

  .rays {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('/assets/gfx/ui/effects/rays.png');
    object-fit: cover;
  }

  &-buttons {
    display: flex;
    flex-direction: column;
    gap: 4.5vh;
  }
}

@keyframes logo-floating {
  0% {
    transform: translateY(12px);
  }

  100% {
    transform: translateY(-12px);
  }
}
</style>
