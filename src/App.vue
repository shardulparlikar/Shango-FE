<template>
  <div>
    <!-- Main placeholder for all routed components -->
    <AppHeader/>
    <router-view />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
// No JS needed unless you want programmatic navigation
</script>

<style scoped>
/* Optional: some global styling */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>