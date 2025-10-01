<template>
  <div class="flex justify-center items-center login-container">
    <Card class="w-full rounded-2xl py-6 px-4">
      <template #title>
        <h2 class="text-lg font-semibold">Créer mot de passe</h2>
      </template>

      <template #content>
        <p class="text-gray-600 mb-3 mt-4 text-sm">
          Veuillez créer le mot de passe pour votre session.
        </p>

        <!-- New Password -->
        <div class="mb-4">
          <Password
            v-model="password"
            toggleMask
            placeholder="Nouveau mot de passe"
            class="w-full"
            :feedback="false"
          />
          <ul class="mt-2 text-sm space-y-1">
            <li :class="validationClasses(isMinLength)">
              ✔ Au moins 12 caractères
            </li>
            <li :class="validationClasses(hasNumberAndSpecial)">
              ✔ Un chiffre et un caractère spécial (@$!%*?)
            </li>
            <li :class="validationClasses(!containsEmailOrName)">
              ✔ Ne doit pas contenir email
            </li>
          </ul>
        </div>

        <!-- Confirm Password -->
        <div class="mb-4">
          <Password
            v-model="confirmPassword"
            toggleMask
            placeholder="Confirmer le mot de passe"
            class="w-full"
            :feedback="false"
          />
          <p v-if="confirmPassword && !passwordsMatch" class="text-red-500 text-xs mt-1">
            Les mots de passe ne correspondent pas
          </p>
        </div>

        <!-- Submit Button -->
        <Button
          label="Valider"
          class="w-full p-button-warning"
          :disabled="!isFormValid"
          @click="submitPassword"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Password from 'primevue/password'
import Button from 'primevue/button'


const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  (e: 'onSubmit'): void
}>()

// State
const password = ref('')
const confirmPassword = ref('')

// Validations
const isMinLength = computed(() => password.value.length >= 12)
const hasNumberAndSpecial = computed(() =>
  /(?=.*\d)(?=.*[@$!%*?&])/.test(password.value)
)
const passwordsMatch = computed(() => password.value === confirmPassword.value)

const isFormValid = computed(
  () => isMinLength.value && hasNumberAndSpecial.value  && passwordsMatch.value && !containsEmailOrName.value
)

// Helper for validation classes
const validationClasses = (valid: boolean) => valid ? 'text-green-600' : 'text-red-500'
const containsEmailOrName = computed(() => {
  const lowerPass = password.value.toLowerCase()
  return (
    lowerPass.includes(props.email.toLowerCase()) ||
    (props.email && lowerPass.includes(props.email.toLowerCase()))
  )
})

// Submit
const submitPassword = () => {
  if (isFormValid.value) {
    emit('onSubmit')
  }
}
</script>

<style scoped lang="scss">
/* Ensure responsiveness */
@media (max-width: 640px) {
  .p-password input {
    font-size: 0.9rem;
  }
}
:deep(.p-inputtext) {
    width: 100%;
}
</style>
