import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Login from '../components/Login.vue'

describe('Login.vue', () => {
  it('renders the login heading', () => {
    render(Login)
    expect(screen.getByText('login')).toBeInTheDocument()
  })
})
