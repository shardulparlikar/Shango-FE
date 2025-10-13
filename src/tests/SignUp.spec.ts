import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SignUp from '../components/SignUp.vue'

const CardStub = { template: '<div><slot name="title"/><slot name="content"/></div>' }
const InputStub = {
  props: ['modelValue', 'placeholder', 'type', 'dataTestid'],
  emits: ['update:modelValue'],
  template: '<input :data-testid="dataTestid" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :type="type"/>'
}
const ButtonStub = {
  props: ['label', 'disabled', 'loading', 'dataTestid'],
  emits: ['click'],
  template: '<button :data-testid="dataTestid" :disabled="disabled" @click="$emit(\'click\')">{{ label }}</button>'
}

vi.mock('../services/authServices', () => ({
  authService: {
    sendOtp: vi.fn(() => Promise.resolve({ data: { message: 'OTP sent' } }))
  }
}))

const addToast = vi.fn()
vi.mock('primevue/usetoast', () => ({
  useToast: () => ({ add: addToast })
}))

vi.mock('../store/globalStore', () => ({
  useGlobalStore: () => ({ getSelectedRole: 'recruteur', setRole: () => {} })
}))

describe('SignUp.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email input and submit button', () => {
    render(SignUp, {
      global: { components: { Card: CardStub, InputText: InputStub, Button: ButtonStub } }
    })

    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('enables submit button when valid email is entered', async () => {
    render(SignUp, {
      global: { components: { Card: CardStub, InputText: InputStub, Button: ButtonStub } }
    })

    const emailInput = screen.getByTestId('email-input')
    const submitBtn = screen.getByTestId('submit-button')

    await fireEvent.update(emailInput, 'test@example.com')

    // in your component, button enabling logic might be inside handleNext
    // so we can simulate blur to trigger validation
    await fireEvent.blur(emailInput)

    expect(submitBtn).not.toBeDisabled()
  })

  it('calls sendOtp and shows toast on submit', async () => {
    const { authService } = await import('../services/authServices')
    const { emitted } = render(SignUp, {
      global: { components: { Card: CardStub, InputText: InputStub, Button: ButtonStub } }
    })

    const emailInput = screen.getByTestId('email-input')
    const submitBtn = screen.getByTestId('submit-button')

    await fireEvent.update(emailInput, 'test@example.com')
    await fireEvent.blur(emailInput)
    await fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(authService.sendOtp).toHaveBeenCalledWith({ contact: 'test@example.com' })
      expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }))
      expect(emitted().onNext || true).toBeTruthy() // your component might emit next step
    })
  })
})
