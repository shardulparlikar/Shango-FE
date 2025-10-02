<template>
  <div :class="['background', isRecruiter ? 'bg-recruiter' : 'bg-talent']">
    <!-- <div class="login-container flex items-center"> -->
      <!-- Email Step -->
      <div v-if="emailStep" class="login-container">
        <Card class="bg-white rounded-2xl w-full">
          <template #title>
            <h2 class="text-2xl font-semibold flex justify-center mb-4 p-4">Créer un compte</h2>
          </template>
          <template #content>
            <div class="flex justify-center mb-4 p-4">
              <SelectButton
                v-model="toggleValue"
                :options="toggleOptions"
                size="large"
                optionLabel="label"
                optionValue="value"
                @update:modelValue="toggleRole"
              />
            </div>
            <div class="flex flex-col gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-400 mb-3">
                  Veuillez entrer votre adresse e-mail pour créer votre compte.
                </label>
                <InputText
                  v-model="email"
                  placeholder="Entrez votre adresse mail"
                  class="w-full"
                  type="email"
                  :class="{ 'p-invalid': emailError && emailTouched }"
                  @blur="emailTouched = true"
                />
                <small v-if="emailError && emailTouched" class="p-error block mt-2">
                  {{ emailError }}
                </small>
              </div>
              <Button 
                label="Suivant" 
                class="w-full mt-2" 
                @click="handleNext"
                :loading="isSendEmailLoading"
                type="button"
                loadingIcon="pi pi-search"
              >
                Suivant
              </Button>
            </div>
          </template>
        </Card>
      </div>
      <!-- otp step -->
      <OtpCard v-else-if="otpStep" :email="email" @onBack="() => setStep('email')"  @onNext="() => setStep('password')"/>
      <!-- password step -->
      <PasswordManager :email="email" @onSubmit="setStep('last')" v-else-if="passwordStep"> </PasswordManager>
      <!-- last step -->
      <ThankYouPage v-else-if="lastStep"></ThankYouPage>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import OtpCard from './OtpCard.vue'
import PasswordManager from './PasswordManager.vue'
import ThankYouPage from './ThankYouPage.vue'
import { useGlobalStore } from '../store/globalStore'
import { authService } from '../services/authServices'
import { useToast } from "primevue/usetoast"
const toast = useToast()

const globalStore = useGlobalStore()

type ToggleOption = {
  label: string
  value: 'recruteur' | 'talent'
}

const email = ref<string>('')
const emailTouched = ref<boolean>(false)
const toggleValue = ref<'recruteur' | 'talent'>('recruteur')
const toggleOptions = ref<ToggleOption[]>([
  { label: 'Je suis un recruteur', value: 'recruteur' },
  { label: 'Je suis un talent', value: 'talent' }
])
const emailStep = ref<boolean>(true)
const otpStep = ref<boolean>(false)
const passwordStep = ref<boolean>(false)
const lastStep = ref<boolean>(false)
const isSendEmailLoading = ref<boolean>(false)

const isRecruiter = computed<boolean>(() => toggleValue.value === 'recruteur')

// Email validation
const isEmailValid = computed<boolean>(() => {
  if (!email.value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const emailError = computed<string>(() => {
  if (!email.value) {
    return 'L\'adresse e-mail est requise'
  }
  if (!isEmailValid.value) {
    return 'Veuillez entrer une adresse e-mail valide'
  }
  return ''
})

const handleNext = async () => {
  emailTouched.value = true
  if (isEmailValid.value) {
    isSendEmailLoading.value = true
    try {
      const res = await authService.sendOtp({ contact: email.value })
      toast.add({ severity: 'success', summary: 'Success Message', detail: res?.data?.message || 'OTP sent to you email', life: 3000 })
      setStep('otp')
    } catch (error: any) {
      console.error('Error sending email:', error?.response?.data?.message )
      toast.add({ severity: 'error', summary: 'Success Message', detail: error?.response?.data?.message || 'Something went wrong', life: 3000 })
    } finally {
      isSendEmailLoading.value = false
    }
  }
}
const setStep = (step: 'email' | 'otp' | 'password' | 'last'): void => {
  // reset all steps first
  emailStep.value = false
  otpStep.value = false
  passwordStep.value = false

  // activate the chosen step
  if (step === 'email') {
    emailStep.value = true
    emailTouched.value = false // Reset touched state when going back
  }
  if (step === 'otp') {
    otpStep.value = true
    emailStep.value = false
  }
  if (step === 'password') {
    otpStep.value = false
    passwordStep.value = true
  } if (step === 'last') {
    passwordStep.value = false
    lastStep.value = true
  }
}

const toggleRole = (value: 'recruteur' | 'talent'): void => {
  globalStore.setRole(value)
  console.log('Role selected:', value)
}

onMounted(() => {
  // Initialize the global store role
  globalStore.setRole(toggleValue.value)
})
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5rem;
}

/* Recruiter background */
.bg-recruiter {
  background-image: url('../assets/images/coach.png');
  background-size: cover;
  background-position: center;
}

/* Talent background */
.bg-talent {
  background-image: url('../assets/images/talent.png');
  background-size: cover;
  background-position: center;
}

@media (max-width: 640px) {
  .background {
    background-image: none !important; /* Remove background on mobile */
    padding-right: 1rem; /* reduce padding for mobile */
    justify-content: center; /* center the card */
  }
  .login-container {
    width: 90%; /* make card almost full width */
    height: auto; /* adapt height */
  }
  
}

.p-error {
  color: #e24c4c;
  font-size: 0.875rem;
}
</style>