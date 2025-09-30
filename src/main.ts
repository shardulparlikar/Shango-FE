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
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}'
    },
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