import React from 'react'
import { render, fireEvent, getByPlaceholderText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SearchPokemon } from './SearchPokemon'

it("renderizado correcto", () => {
    const {queryByTestId, queryByPlaceholderText} = render(<SearchPokemon />)

    expect(queryByTestId("search-input")).toBeTruthy();
    expect(queryByPlaceholderText("Buscar...")).toBeTruthy();
})

describe("Ingresando valores", () => {
    it("actualizaciones en cambios", () => {
        const { queryByPlaceholderText } = render(<SearchPokemon />)

        const searchInput = queryByPlaceholderText("Buscar...")
        fireEvent.change(searchInput, { target: { value: "test"}})

        expect(searchInput.value).toBe("test")
    })
})

describe("Boton de busqueda", () => {
    it("con texto vacio", () => {
        const requestSearch = jest.fn();

        const { queryByTestId } = render(<SearchPokemon requestSearch={requestSearch} />)
        fireEvent.keyPress(queryByTestId("search-input"))
        expect(requestSearch).not.toHaveBeenCalled();
    })
})

describe('boton de busqueda no vacia', () => {
    it('con texto', () => {
      const handleChange = jest.fn();
      
      const { queryByPlaceholderText } = render(<SearchPokemon  handleChange={handleChange} />)
  
      const searchInput = queryByPlaceholderText('Buscar...')
  
      fireEvent.change(searchInput, { target: { value: 'pikachu' } })
  
      expect(handleChange).toHaveBeenCalled()
    })
  })