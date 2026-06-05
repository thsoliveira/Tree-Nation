import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Tree-Nation heading', () => {
  render(<App />)
  expect(screen.getByText('Tree-Nation')).toBeInTheDocument()
})

