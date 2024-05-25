import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { server } from '@/mocks/node'

import App from './App'

describe('<App />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('renders movie list title', () => {
    render(<App />)

    expect(screen.getByText('Movie List')).toBeInTheDocument()
  })
})
