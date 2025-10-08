<template>
  <div>
    <Toast  position="bottom-right"/>
    <!-- Main placeholder for all routed components -->
    <AppHeader/>
    <router-view />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { usePreset, definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { watch, computed } from 'vue'
import { useGlobalStore } from './store/globalStore'
import Toast from 'primevue/toast';
const globalStore = useGlobalStore()

// No JS needed unless you want programmatic navigation

 // Talent theme with custom color
const TalentTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FCEAEA',
      100: '#F9CACA',
      200: '#F6A8A8',
      300: '#F28585',
      400: '#EB5757',
      500: '#EB5757',
      600: '#C83535',
      700: '#A72C2C',
      800: '#861F1F',
      900: '#651414',
      950: '#4C0D0D'
    }
  },
})

// Recruiter theme with custom color
const RecruiterTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFF7E6',
      100: '#FFE6B8',
      200: '#FFD38A',
      300: '#FFC15C',
      400: '#EAA505', 
      500: '#EAA505',
      600: '#B87700',
      700: '#9D6100',
      800: '#814900',
      900: '#663500',
      950: '#4D2600'
    }
  }
})

  const currentRole = computed(() => globalStore.isRecruiter)
  watch(() => currentRole.value, (newVal) => {
    console.log('Role changed:', newVal)
    if (newVal) {
      const theme = usePreset(RecruiterTheme)
      console.log('Current theme primary color (Recruiter):', theme)
    } else {
      usePreset(TalentTheme)
    }
  } )
</script>

<style scoped>
/* Optional: some global styling */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
@media (max-width: 640px) {
  :deep(.p-card) {
    box-shadow: none;
    border: none;
    padding: 0;
  }
  :deep(.p-card-body){
    padding: 0;
  }
}
</style>