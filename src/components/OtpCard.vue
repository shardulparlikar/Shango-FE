<template>
  <div class="flex justify-center items-center login-container">
    <Card class="w-full rounded-2xl w-full">
      <template #title>
        <div class="flex items-center mb-4">
          <Button icon="pi pi-arrow-left" class="p-button-text mr-2" @click="goBack" />
          <h2 class="text-lg font-semibold">Code de vérification</h2>
        </div>
      </template>

      <template #content>
        <div class="mx-4">
          <p class="text-gray-600 mb-6 text-sm">
            Entrez le code de vérification à six (06) chiffres a été envoyé à
            <span class="font-medium">{{ props.email }}</span>
          </p>
          <div class="mb-4">
            <InputOtp
              v-model="otp"
              :length="6"
              separator=" "
              input-style="text-align: center; font-size: 1.25rem;"
            />
            <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
          </div>
          <div class="flex justify-between items-center mb-6 text-sm text-gray-500">
            <span>⏱ Renvoyer dans {{ countdown }}s</span>
            <Button label="Renvoyer" class="p-button-text p-button-sm" @click="resendOtp" :disabled="countdown > 0" :loading="loading"/>
          </div>
          <Button label="Vérifier" class="w-full p-button-warning " @click="verifyOtp" :loading="loading" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import InputOtp from 'primevue/inputotp'
import Button from 'primevue/button'
import { authService } from '../services/authServices'
import { useToast } from "primevue/usetoast"
const toast = useToast()

// Props
const props = defineProps<{
  email: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'onBack'): void
  (e: 'onNext', otp: string): void
}>()


const otp = ref('')
const countdown = ref(60)
let timer: number | undefined
const errorMessage = ref('')
const loading  = ref(false)

const startCountdown = () => {
  countdown.value = 60
  timer = window.setInterval(() => {
    if (countdown.value > 0) countdown.value--
    else clearInterval(timer)
  }, 1000)
}

const resendOtp = async () => {
  loading.value = true
  try {
    const res = await authService.resendOtp({ contact: props.email })
    startCountdown()
    toast.add({ severity: 'success', summary: 'Success Message', detail: res?.data?.message || 'OTP sent to you email', life: 3000 })
  } catch (error: any) {
    console.error('Error resending OTP:', error?.response?.data?.message )
    toast.add({ severity: 'error', summary: 'Error Message', detail: error?.response?.data?.message || 'Something went wrong', life: 3000 })
  }
  loading.value = false
}
const validateOtp = (): boolean => {
  if (!otp.value) {
    errorMessage.value = 'Veuillez entrer le code OTP.'
    return false
  }
  if (!/^\d{6}$/.test(otp.value)) {
    errorMessage.value = 'Le code doit contenir exactement 6 chiffres.'
    return false
  }
  errorMessage.value = ''
  return true
}

const verifyOtp = async () => {
  if (!validateOtp()) return
  loading.value = true
  try {
    const res = await authService.verifyOtp({ contact: props.email, otp: otp.value })
    toast.add({ severity: 'success', summary: 'Success Message', detail: res?.data?.message || 'OTP verified successfully', life: 3000 })
  } catch (error: any) {
    console.error('Error verifying OTP:', error?.response?.data?.message )
    toast.add({ severity: 'error', summary: 'Error Message', detail: error?.response?.data?.message || 'Invalid OTP', life: 3000 })
    return
  }
  loading.value = true
  emit('onNext', otp.value)
}

const goBack = () => {
  emit('onBack')
}
onMounted(() => {
  startCountdown()
})

</script>

<style scoped>
/* Optional: Customize OTP inputs further */
.p-input-otp input {
  border-radius: 5rem;
  border: 1px solid #d1d5db; /* gray-300 */
}
</style>
