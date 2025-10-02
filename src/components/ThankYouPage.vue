<template>
  <div class="flex justify-center login-container ">
    <Card class="w-full max-w-md rounded-2xl shadow-lg h-full justify-end">
      <template #content>
        <div class="flex flex-col items-center text-center space-y-6">
          <!-- Success Icon -->
          <div class="relative flex items-center justify-center">
            <i
              class="pi pi-check-circle text-green-500"
              style="font-size: 4rem"
            ></i>
          </div>

          <!-- Text -->
          <div>
            <h2 class="text-xl font-bold text-gray-900">Félicitations</h2>
            <p class="text-gray-600 mt-2 text-sm sm:text-base">
              Votre compte <span class="font-semibold">"{{ role }}"</span> a été créé avec succès.
            </p>
          </div>

          <!-- Button -->
          <Button
            label="Aller au tableau de bord"
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg"
            @click="goToDashboard"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useGlobalStore } from '../store/globalStore'
const globalStore = useGlobalStore()

const goToDashboard = () => {
  console.log('Redirect to dashboard')
}

const role = computed(() => globalStore.isRecruiter ? 'Recruteur' : 'Talent')

</script>

<style scoped>
/* Animation for dots */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
