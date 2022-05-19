import React from 'react'
import { render, screen, fireEvent, getByTestId } from "@testing-library/react"
import { ModalPokemon } from './ModalPokemon'

describe("test ModalPokemon", () => {
    test("si una prop de nombre es pasada, renderizar el titulo con el nombre ", () => {
        render(<ModalPokemon name="Lucario" />);
        const titulo = screen.getByText("Editar Pokemon Lucario")
        expect(titulo).toBeInTheDocument();
    })

    test("si el id pasado es null, renderiza Nuevo Pokemon", () => {
        render(<ModalPokemon idPokemon={null} />)
        const titulo = screen.getByText("Nuevo Pokemon")
        expect(titulo).toBeInTheDocument();
    })

    /*test("si un id es pasado como parametro, renderiza el titulo con el nomnbre del pokemon", () => {
        render(<ModalPokemon name="Squirtle" />)
        const titulo = screen.getAllByPlaceholderText("Name")
        expect(titulo).toBe("Squirtle");
    })*/

    test('el boton "Guardar" debe estar deshabilitado si el input de Nombre está vacio', () => {
        render(<ModalPokemon name="" />)
        const input = screen.getByTestId('name')
        
        fireEvent.change(input, {target: {value: ''}})
        expect(screen.getByTestId('buttonSave')).toBeDisabled();
    })

    test('el boton "Guardar" debe estar deshabilitado si el input de Nombre está vacio', () => {
        render(<ModalPokemon image="" />)
        const input = screen.getByTestId('image')
        
        fireEvent.change(input, {target: {value: ''}})
        expect(screen.getByTestId('buttonSave')).toBeDisabled();
    })

    test('el boton "Guardar" debe estar deshabilitado si el input de Nombre está vacio', () => {
        render(<ModalPokemon name="pikachu kev"
            image="https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png" />)
        const input = screen.getByTestId('name')
        const image = screen.getByTestId("image")
        
        fireEvent.change(input, {target: {value: 'pikachu kev'}})
        fireEvent.change(image, {target: {value: 'https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png'}})
        expect(screen.getByTestId('buttonSave')).not.toBeDisabled();
    })

    test('muestra modal del hijo y cierra el modal', () => {
        // Arrange
        const toggleC = jest.fn()
      
        // Act
        const {getByText} = render(
            <ModalPokemon toggle={toggleC} >
            </ModalPokemon>,
        )
       
        // Act
        fireEvent.click(getByText("×"))
      
        // Assert
        expect(toggleC).toHaveBeenCalledTimes(1)
    })

})

