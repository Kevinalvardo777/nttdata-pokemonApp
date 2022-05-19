import React from 'react'
import { render, fireEvent, getByPlaceholderText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SearchPokemon } from './SearchPokemon'

describe('Input value', () => {
    it('updates on change', () => {
      const handleChange = jest.fn();
      
      const busqueda = "pikachu"
      const { queryByPlaceholderText } = render(<SearchPokemon busqueda={busqueda} handleChange={handleChange} />)
  
      const searchInput = queryByPlaceholderText('Buscar')
  
      fireEvent.change(searchInput, { target: { value: 'pikachu' } })
  
      expect(searchInput.value).toBe('pikachu')
    })
  })