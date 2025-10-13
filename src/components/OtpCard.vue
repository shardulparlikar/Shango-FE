<template>
  <div class="flex justify-center items-center login-container">
    <Card class="w-full rounded-2xl py-2">
      <template #title>
        <div class="flex items-center mb-4">
          <Button icon="pi pi-arrow-left" class="p-button-text mr-2 black-color" @click="goBack" data-testid="back-button" />
          <h2 class="header-font black-color">Code de vérification</h2>
        </div>
      </template>

      <template #content>
        <div class="mx-4">
          <p class="text-col mb-6 text-sm">
            Entrez le code de vérification à six (06) chiffres a été envoyé à
            <span class="font-bold">{{ props.email }}</span>
          </p>
          <div class="mb-4">
            <InputOtp
              v-model="otp"
              :length="6"
              separator=" "
              input-style="text-align: center; font-size: 1.25rem;"
              :class="{ error: hasOtpError }"
              data-testid="otp-input"
            />
            <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
          </div>
          <div class="flex justify-between items-center mb-6 text-sm text-gray-500">
            <span>⏱ Renvoyer dans {{ countdown }}s</span>
            <Button label="Renvoyer" class="p-button-text p-button-sm" @click="resendOtp" :disabled="countdown > 0" :loading="loading" data-testid="resend-button"/>
          </div>
          <Button label="Vérifier" class="w-full p-button-warning " @click="verifyOtp" :loading="loading" data-testid="verify-button"/>
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
const hasOtpError = ref(false)

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
  hasOtpError.value = false
  return true
}

const verifyOtp = async () => {
  if (!validateOtp()) return
  loading.value = true
  try {
    const res = await authService.verifyOtp({ contact: props.email, otp: otp.value })
    toast.add({ severity: 'success', summary: 'Success Message', detail: res?.data?.message || 'OTP verified successfully', life: 3000 })
    emit('onNext', otp.value)
  } catch (error: any) {
    console.error('Error verifying OTP:', error?.response?.data?.message )
    toast.add({ severity: 'error', summary: 'Error Message', detail: error?.response?.data?.message || 'Invalid OTP', life: 3000 })
    errorMessage.value = 'Le code OTP est incorrect.'
    hasOtpError.value = true
    return
  }
  finally {
    loading.value = false
  }
}

const goBack = () => {
  emit('onBack')
}
onMounted(() => {
  startCountdown()
})

</script>

<style scoped>
.text-col {
  color: #334155;
}

:deep(.p-inputotp-input) {
  width: 52px;
  height: 52px;
  font-size: 1.25rem;
  text-align: center;
  padding: 0;
  border-radius: 8px;
  border: 1.5px solid #1E293B;
}

:deep(.p-inputotp) {
  gap: 20px;
}
:deep(.p-inputotp.error .p-inputotp-input) {
  border-color: #ef4444;
}

@media (max-width: 640px) {
  :deep(.p-inputotp-input) {
    width: 45px;
    height: 45px;
    font-size: 1.125rem;
  }

  :deep(.p-inputotp) {
    gap: 8px;
  }

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

