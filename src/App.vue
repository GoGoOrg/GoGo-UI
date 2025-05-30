<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import HeaderBar from './components/HeaderBar.vue';
  import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div id="app" class="w-100 d-flex flex-column">

    <header>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <HeaderBar v-if="!$route.meta.hideHeader"></HeaderBar>
    </header>

    <RouterView :key="$route.fullPath" />
    
    <footer>
      <FooterBar v-if="!$route.meta.hideFooter"></FooterBar>
    </footer>
  </div>
</template>

<style scoped>

</style>
