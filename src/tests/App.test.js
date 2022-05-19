import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { getPokemonById, getPokemons } from '../api/pokemons';

describe("Componente App", () => {
    test("App", () => {
        render(<App />);
        const linkElement = screen.getByText(/Listado de pokemon/i);
        expect(linkElement).toBeInTheDocument();
    })

    test("Api get testing", async() => {
        const resultado = await getPokemons();
        //console.log(resultado);
        console.log(resultado[0].name);
        expect(resultado[0].name).toEqual("Lucario")
    })
    
    test("Api get testing by id", async() => {
        const resultado = await getPokemonById(7395);
        //console.log(resultado.name);
        expect(resultado.name).toEqual("Lucario")
        //expect("pikachu").toEqual("pikachu")
    })
})




