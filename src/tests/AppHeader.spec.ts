import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import AppHeader from '../components/AppHeader.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [{ path: '/', component: AppHeader, meta: {} }]

describe('AppHeader.vue', () => {
  it('renders header text for talent', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes
    })

    render(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({ initialState: { globalStore: { isRecruiter: false } }, createSpy: vi.fn })
        ]
      }
    })

    expect(screen.getByText('Revenir à l’accueil')).toBeInTheDocument()
    const logo = screen.getByAltText('Logo Dark')
    expect(logo.getAttribute('src')).toMatch(/talentLogo\.png$/)
  })

  it('renders recruiter logo when isRecruiter is true', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes
    })

    render(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({ initialState: { globalStore: { isRecruiter: true } }, createSpy: vi.fn })
        ]
      }
    })

    const logo = screen.getByAltText('Logo Dark')
    expect(logo.getAttribute('src')).toMatch('/src/assets/images/talentLogo.png')
  })

  it('hides header text when route meta hideHeaderAction is true', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: AppHeader, meta: { hideHeaderAction: true } }]
    })

    render(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({ initialState: { globalStore: { isRecruiter: false } }, createSpy: vi.fn })
        ]
      }
    })
    await router.isReady()
    expect(screen.queryByText('Revenir à l’accueil')).not.toBeInTheDocument()
  })
})
