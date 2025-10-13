import { render, screen, waitFor } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App.vue'
import { createTestingPinia } from '@pinia/testing'
import PrimeVue from 'primevue/config'
import { config } from '@vue/test-utils'

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ country_name: 'India', continent_code: 'AS' })
  })
))

config.global.plugins = [PrimeVue]

describe('App.vue', () => {
  beforeEach(() => {
    render(App, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          AppHeader: { template: '<div>Header</div>' },
          AppFooter: { template: '<div>Footer</div>' },
          RouterView: { template: '<div>Router View</div>' }
        }
      }
    })
  })

  it('renders header, footer, and router view', () => {
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByText('Router View')).toBeInTheDocument()
  })

  it('calls fetch to get location on mount', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })
  })
})
