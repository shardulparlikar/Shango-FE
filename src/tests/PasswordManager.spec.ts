import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PasswordManager from '../components/PasswordManager.vue'
import { nextTick } from 'vue'

const CardStub = { template: '<div><slot name="title"/><slot name="content"/></div>' }
const PasswordStub = {
  props: ['modelValue', 'toggleMask', 'placeholder', 'feedback'],
  emits: ['update:modelValue'],
  template: '<input :placeholder="placeholder" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)"/>'
}
const ButtonStub = {
  props: ['label', 'loading', 'disabled'],
  emits: ['click'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')">{{ label }}</button>'
}

vi.mock('../services/authServices', () => ({
  authService: {
    registerUser: vi.fn(() => Promise.resolve({ data: { message: 'Password set successfully' } }))
  }
}))

const addToast = vi.fn()
vi.mock('primevue/usetoast', () => ({
  useToast: () => ({ add: addToast })
}))

vi.mock('../store/globalStore', () => ({
  useGlobalStore: () => ({ getSelectedRole: 'talent' })
}))

describe('PasswordManager.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders title and instructions', () => {
    render(PasswordManager, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Password: PasswordStub, Button: ButtonStub } }
    })
    expect(screen.getByText('Créer mot de passe')).toBeInTheDocument()
    expect(screen.getByText(/Veuillez créer le mot de passe/)).toBeInTheDocument()
  })

  it('disables submit button if password is invalid', async () => {
    render(PasswordManager, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Password: PasswordStub, Button: ButtonStub } }
    })
    const submitBtn = screen.getByRole('button', { name: /Valider/i })
    expect(submitBtn).toBeDisabled()
  })

  it('shows error if passwords do not match', async () => {
    render(PasswordManager, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Password: PasswordStub, Button: ButtonStub } }
    })

    const newPasswordInput = screen.getByPlaceholderText('Nouveau mot de passe')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirmer le mot de passe')

    await fireEvent.update(newPasswordInput, 'Password@12345')
    await fireEvent.update(confirmPasswordInput, 'Password@1234')
    await nextTick()

    expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument()
  })

  it('enables submit button when password is valid and matches', async () => {
    render(PasswordManager, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Password: PasswordStub, Button: ButtonStub } }
    })

    const newPasswordInput = screen.getByPlaceholderText('Nouveau mot de passe')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirmer le mot de passe')
    const submitBtn = screen.getByRole('button', { name: /Valider/i })

    await fireEvent.update(newPasswordInput, 'Password@12345')
    await fireEvent.update(confirmPasswordInput, 'Password@12345')
    await nextTick()

    expect(submitBtn).not.toBeDisabled()
  })

  it('calls authService.registerUser and emits onSubmit when valid password submitted', async () => {
    const { emitted } = render(PasswordManager, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Password: PasswordStub, Button: ButtonStub } }
    })

    const newPasswordInput = screen.getByPlaceholderText('Nouveau mot de passe')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirmer le mot de passe')
    const submitBtn = screen.getByRole('button', { name: /Valider/i })

    await fireEvent.update(newPasswordInput, 'Password@12345')
    await fireEvent.update(confirmPasswordInput, 'Password@12345')
    await nextTick()

    await fireEvent.click(submitBtn)

    const { authService } = await import('../services/authServices')

    await waitFor(() => {
      expect(authService.registerUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password@12345',
        userType: 'talent'
      })
      expect(emitted().onSubmit).toBeTruthy()
      expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }))
    })
  })
})
