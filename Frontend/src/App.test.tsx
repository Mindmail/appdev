import { render, screen } from '@testing-library/react'
import React from 'react'

// import App from './App'
import Loading from './components/Loading'

test('renders learn react link', () => {
  render(<Loading />)
  const linkElement = screen.getByText(/Loading.../i)
  expect(linkElement).toBeInTheDocument()
})
