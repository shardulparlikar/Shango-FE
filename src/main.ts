import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes';


const customTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFF7E6',
      100: '#FFE6B8',
      200: '#FFD38A',
      300: '#FFC15C',
      400: '#EAA505', // main Recruiter color
      500: '#EAA505',
      600: '#B87700',
      700: '#9D6100',
      800: '#814900',
      900: '#663500',
      950: '#4D2600'
    }
  }
});

import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: customTheme,
    options: {
      darkModeSelector: ".app-dark",
    }
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')