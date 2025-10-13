import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import AppFooter from '../components/AppFooter.vue'

describe('AppFooter.vue', () => {
  it('renders the copyright text', () => {
    render(AppFooter)
    expect(screen.getByText('© 2024 Shango. All rights reserved.')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(AppFooter)
    expect(screen.getByText('Termes et conditions')).toBeInTheDocument()
    expect(screen.getByText('Politiques de confidentialité')).toBeInTheDocument()
  })
})
