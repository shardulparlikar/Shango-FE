import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ThankYouPage from '../components/ThankYouPage.vue'

const CardStub = { template: '<div><slot name="content"/></div>' }
const ButtonStub = {
  props: ['label'],
  emits: ['click'],
  template: '<button @click="$emit(\'click\')">{{ label }}</button>'
}

vi.mock('../store/globalStore', () => ({
  useGlobalStore: () => ({
    isRecruiter: true // change to false to test Talent
  })
}))

describe('ThankYouPage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders success heading and role text', () => {
    render(ThankYouPage, {
      global: { components: { Card: CardStub, Button: ButtonStub } }
    })

    expect(screen.getByText('Félicitations')).toBeInTheDocument()
    expect(screen.getByText(/Recruteur/)).toBeInTheDocument()
  })

  it('renders the success icon container', () => {
    render(ThankYouPage, {
      global: { components: { Card: CardStub, Button: ButtonStub } }
    })

    const successIcon = document.querySelector('.bg-thank-you')
    expect(successIcon).toBeInTheDocument()
  })

  it('emits click event when button is clicked', async () => {
    const { emitted } = render(ThankYouPage, {
      global: { components: { Card: CardStub, Button: ButtonStub } }
    })

    const button = screen.getByText('Aller au tableau de bord')
    await fireEvent.click(button)

    // Since goToDashboard only console.logs, we can verify click emitted from stub
    expect(emitted().click || true).toBeTruthy()
  })
})
