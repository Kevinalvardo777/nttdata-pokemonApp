import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { TablePokemons } from './TablePokemons'

describe('Probando componente TablePokemon', () => {

    test("pronando valores recibidos para TablePokemon", () => {
        const pokemones = 
            [
                {
                "id": 7307,
                "name": "Squirtle",
                "image": "https://www.ecured.cu/images/0/08/Squirtle1.png",
                "type": "normal",
                "hp": 0,
                "attack": 59,
                "defense": 28,
                "idAuthor": 1,
                "created_at": "2022-05-16T20:49:38.149Z",
                "updated_at": "2022-05-17T22:08:18.287Z"
                },
                {
                "id": 7315,
                "name": "pikachu kev",
                "image": "https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png",
                "type": "normal",
                "hp": 0,
                "attack": 97,
                "defense": 79,
                "idAuthor": 1,
                "created_at": "2022-05-17T00:28:27.464Z",
                "updated_at": "2022-05-18T16:34:58.055Z"
                },
                {
                "id": 7322,
                "name": "Charizard",
                "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006_f3.png",
                "type": "normal",
                "hp": 0,
                "attack": 48,
                "defense": 68,
                "idAuthor": 1,
                "created_at": "2022-05-17T00:34:54.214Z",
                "updated_at": "2022-05-17T00:35:21.772Z"
                },
                {
                "id": 7395,
                "name": "Lucario",
                "image": "https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/1e83fbcb00ab179cc89db5c53baea3e72d5942ad.png",
                "type": "normal",
                "hp": 0,
                "attack": 28,
                "defense": 25,
                "idAuthor": 1,
                "created_at": "2022-05-18T16:17:24.264Z",
                "updated_at": "2022-05-18T16:17:24.264Z"
                }
            ];
        render(<TablePokemons pokemons={pokemones} />)
    
        pokemones.map((pokemon, i) => {
            const row = screen.getAllByTestId('idPokemon')
    
            const utils = within(row);
            expect(utils.getByText(pokemon.name)).toEqual("Squirtle");
            /*expect(utils.getByText(pokemon.attack)).toBeInTheDocument();
            expect(utils.getByText(pokemon.defense)).toBeInTheDocument();*/
        });
    })

    test("si escribo una palabra no existente en la tabla no se renderiza", () => {
        render(<TablePokemons messageNoPokemons="No se encontraron pokemones" />)
        const mensaje = screen.getByTestId('pokemonsMessage').innerHTML
        expect(mensaje).toEqual("No se encontraron pokemones");
    })
    
})