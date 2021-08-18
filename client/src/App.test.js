import { render, screen } from '@testing-library/react';
import LandingPage  from './Components/Landing/Landing'
import About from './Components/About/About';
import { MemoryRouter } from 'react-router-dom'

test('Rederiza texto de bienvenida', () => {
  render(<LandingPage />, { wrapper: MemoryRouter })

  expect(screen.getByText('Welcome!')).toBeInTheDocument()
})

test('Debe tener una Imagen', () => {
  render(<About />, { wrapper: MemoryRouter })

  expect(screen.getAllByRole('img')).toHaveLength(9)
})



