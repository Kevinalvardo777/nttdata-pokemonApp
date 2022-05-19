import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
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
        /*
        cambiar en package.json en scripts
        "test": "react-scripts test",
        */
        //console.log(resultado);
        //console.log(resultado[0].name);
        expect(resultado[0].name).toEqual("Lucario")
    })
    
    test("Api get testing by id", async() => {
        const resultado = await getPokemonById(7414);
        //console.log(resultado.name);
        expect(resultado.name).toEqual("pulmana")
        //expect("pikachu").toEqual("pikachu")
    })
})




