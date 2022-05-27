import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { TablePokemons } from './TablePokemons'

describe('Probando componente TablePokemon', () => {

    test("renderizando pokemons", () => {
        const fakePokemons = [
            {
                "id": 7486,
                "name": "lolinrrr",
                "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006_f3.png",
                "type": "normal",
                "hp": 56,
                "attack": 40,
                "defense": 34,
                "idAuthor": 1,
                "created_at": "2022-05-22T20:04:56.939Z",
                "updated_at": "2022-05-26T18:27:20.279Z"
              },
              {
                "id": 7505,
                "name": "Snorlax",
                "image": "https://i.pinimg.com/originals/85/1e/cf/851ecf1b1c06cb071c37fb3c6de2ea4a.jpg",
                "type": "normal",
                "hp": 100,
                "attack": 48,
                "defense": 84,
                "idAuthor": 1,
                "created_at": "2022-05-25T21:25:55.717Z",
                "updated_at": "2022-05-25T21:35:34.508Z"
              },
              {
                "id": 7506,
                "name": "Lucario",
                "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448.png",
                "type": "normal",
                "hp": 45,
                "attack": 11,
                "defense": 40,
                "idAuthor": 1,
                "created_at": "2022-05-26T18:30:00.678Z",
                "updated_at": "2022-05-26T18:30:39.365Z"
              }
        ]

        const { getAllByTestId } = render(<TablePokemons pokemons={fakePokemons} />)
        const pokemonsNames = getAllByTestId("pokemonName").map(element => element.textContent)
        const fakePokemonsNames = fakePokemons.map(fp => fp.name)
        expect(pokemonsNames).toEqual(fakePokemonsNames);
    })


    test("si escribo una palabra no existente en la tabla no se renderiza", () => {
        render(<TablePokemons messageNoPokemons="No se encontraron pokemones" />)
        const mensaje = screen.getByTestId('pokemonsMessage').innerHTML
        expect(mensaje).toEqual("No se encontraron pokemones");
    })

})