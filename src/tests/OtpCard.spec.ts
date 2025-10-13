import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import OtpCard from '../components/OtpCard.vue'
import { nextTick } from 'vue'

const CardStub = {
  template: '<div><slot name="title" /><slot name="content" /><slot /></div>'
}

const InputOtpStub = {
  props: ['modelValue', 'length'],
  emits: ['update:modelValue'],
  template: `
    <div class="p-inputotp">
      <input 
        data-testid="otp-input"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
      />
    </div>
  `
}

const ButtonStub = {
  props: ['label', 'dataTestid', 'loading', 'disabled', 'icon'],
  emits: ['click'],
  template: '<button :data-testid="dataTestid" :disabled="disabled" @click="$emit(\'click\')">{{ label }}</button>'
}

// Mock authService
vi.mock('../services/authServices', () => ({
  authService: {
    resendOtp: vi.fn(() => Promise.resolve({ data: { message: 'OTP sent' } })),
    verifyOtp: vi.fn(() => Promise.resolve({ data: { message: 'OTP verified' } }))
  }
}))

// Mock PrimeVue Toast
vi.mock('primevue/usetoast', () => ({
  useToast: () => ({ add: vi.fn() })
}))

describe('OtpCard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders heading and email', () => {
    render(OtpCard, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Button: ButtonStub, InputOtp: InputOtpStub } }
    })
    expect(screen.getByText('Code de vérification')).toBeInTheDocument()
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument()
  })

  it('emits "onBack" when back button is clicked', async () => {
    const { emitted } = render(OtpCard, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Button: ButtonStub, InputOtp: InputOtpStub } }
    })
    const backButton = screen.getByTestId('back-button')
    await fireEvent.click(backButton)
    expect(emitted().onBack).toBeDefined()
  })

  it('shows error if OTP is empty and verify clicked', async () => {
    render(OtpCard, {
      props: { email: 'test@example.com' },
      global: { components: { Card: CardStub, Button: ButtonStub, InputOtp: InputOtpStub } }
    })
    const verifyButton = screen.getByTestId('verify-button')
    await fireEvent.click(verifyButton)
    await nextTick()
    expect(await screen.findByText('Veuillez entrer le code OTP.')).toBeInTheDocument()
  })

})
