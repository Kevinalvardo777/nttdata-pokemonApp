import React from 'react'
import { getByTestId, render, screen, fireEvent, getByRole, getAllByTestId, queryByText } from '@testing-library/react'
import { ModalDeletePokemon } from './ModalDeletePokemon';

describe("Componente ModalDeletePokemon", () => {
    test("si una prop de nombre es pasada, renderizar el mensaje con la prop ", () => {
        render(<ModalDeletePokemon name="Lucario" />);
        const titulo = screen.getByTestId("titleDelete")
        expect(titulo).toBeInTheDocument();
    })

    test('muestra modal de eliminar y cierra el modal', () => {
        // Arrange
        const toggleClose = jest.fn()
      
        // Act
        const {getByText} = render(
          <ModalDeletePokemon toggleClose={toggleClose} name="Lucario">
            
          </ModalDeletePokemon>,
        )
        // Assert
        expect(getByText('Lucario')).toBeTruthy()
      
        // Act
        fireEvent.click(getByText("×"))
      
        // Assert
        expect(toggleClose).toHaveBeenCalledTimes(1)
      })

      test('cierra el modal al presionar el boton cancelar', () => {
        // Arrange
        const toggleClose = jest.fn()
      
        // Act
        const {getByText} = render(
          <ModalDeletePokemon toggleClose={toggleClose} name="Lucario">
            
          </ModalDeletePokemon>,
        )
        // Assert
        expect(getByText('Cancelar')).toBeTruthy()
      
        // Act
        fireEvent.click(getByText("×"))
      
        // Assert
        expect(toggleClose).toHaveBeenCalledTimes(1)
      })
})