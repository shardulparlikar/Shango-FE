<template>
  <div :class="['background', isRecruiter ? 'bg-recruiter' : 'bg-talent']">
    <div class="login-container flex items-center">
      <!-- Email Step -->
      <div v-if="emailStep">
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
                />
              </div>
              <Button label="Login" class="w-full mt-2" :onClick="() => setStep('otp')" >
                Suivant
              </Button>
            </div>
          </template>
        </Card>
      </div>
      <!-- otp step -->
      <OtpCard v-else-if="otpStep" :email="email" @onBack="() => setStep('email')"  @onNext="() => setStep('password')"/>
      <!-- password step -->
      <div v-else-if="passwordStep"> hiiiiiiiii</div>
      <!-- last step -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import OtpCard from './OtpCard.vue'
import { useGlobalStore } from '../store/globalStore'

const globalStore = useGlobalStore()

type ToggleOption = {
  label: string
  value: 'recruteur' | 'talent'
}

const email = ref<string>('')
const toggleValue = ref<'recruteur' | 'talent'>('recruteur')
const toggleOptions = ref<ToggleOption[]>([
  { label: 'Je suis un recruteur', value: 'recruteur' },
  { label: 'Je suis un talent', value: 'talent' }
])
const emailStep = ref<boolean>(true)
const otpStep = ref<boolean>(false)
const passwordStep = ref<boolean>(false)
const lastStep = ref<boolean>(false)

const isRecruiter = computed<boolean>(() => toggleValue.value === 'recruteur')

const setStep = (step: 'email' | 'otp' | 'password'): void => {
  // reset all steps first
  emailStep.value = false
  otpStep.value = false
  passwordStep.value = false

  // activate the chosen step
  if (step === 'email') emailStep.value = true
  if (step === 'otp') otpStep.value = true
  if (step === 'password') passwordStep.value = true
}
const toggleRole = (value: 'recruteur' | 'talent'): void => {
  console.log('Role selected:', value)
  globalStore.setRole(value)
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

.login-container {
  width: 500px;
  height: 400px;
}
</style>
