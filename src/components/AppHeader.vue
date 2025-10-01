<template>
  <header class="fixed top-0 left-0 w-full flex items-center justify-center sm:justify-between px-4 sm:px-24 py-2 sm:py-4 bg-transparent">
  <!-- App Name / Title (hide on small) -->
  <div class="hidden sm:flex text-2xl font-bold text-white gap-2 justify-center items-center" v-if="!hideHeader">
    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
    <p class="text-white text-lg">Revenir à l’accueil</p>
  </div>

  <!-- Logo always visible -->
  <img src="../assets/images/logo.png" alt="Logo" class="hidden sm:block h-10 w-auto" />
  <img src="../assets/images/LogoDark.png" alt="Logo Dark" class="block sm:hidden h-10 w-auto mx-auto" />
</header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const hideHeader = computed(() => route.meta.hideHeaderAction === true)
</script>

