import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { TablePokemons } from './TablePokemons'

describe('Probando componente TablePokemon', () => {
    
    test("renderizando pokemons", () => {
        const fakePokemons = [
            {
                "id": 7395,
                "name": "Lucario",
                "image": "https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/1e83fbcb00ab179cc89db5c53baea3e72d5942ad.png",
                "type": "fire",
                "hp": 100,
                "attack": 55,
                "defense": 25,
                "idAuthor": 1,
                "created_at": "2022-05-18T16:17:24.264Z",
                "updated_at": "2022-05-18T23:17:09.502Z"
            },
            {
                "id": 7403,
                "name": "Pikachuu",
                "image": "https://vignette.wikia.nocookie.net/doblaje/images/e/ea/Pikachu_DP.png/revision/latest?cb=20161002183304&path-prefix=es",
                "type": "normal",
                "hp": 61,
                "attack": 1,
                "defense": 30,
                "idAuthor": 1,
                "created_at": "2022-05-18T22:55:05.978Z",
                "updated_at": "2022-05-19T04:51:37.075Z"
            },
            {
                "id": 7414,
                "name": "pulmana",
                "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png",
                "type": "normal",
                "hp": 5,
                "attack": 67,
                "defense": 35,
                "idAuthor": 1,
                "created_at": "2022-05-19T04:00:45.287Z",
                "updated_at": "2022-05-19T05:11:53.644Z"
            },
            {
                "id": 7415,
                "name": "Holi",
                "image": "JAJAJA",
                "type": "normal",
                "hp": 10,
                "attack": 32,
                "defense": 50,
                "idAuthor": 1,
                "created_at": "2022-05-19T04:35:53.478Z",
                "updated_at": "2022-05-19T04:49:33.064Z"
            },
            {
                "id": 7417,
                "name": "Kevin Fernando",
                "image": "https://assets.pokemon.com/assets//cms2-es-es/img/watch-pokemon-tv/_tiles/broadcaster/season23-boing-169.png",
                "type": "normal",
                "hp": 100,
                "attack": 100,
                "defense": 100,
                "idAuthor": 1,
                "created_at": "2022-05-19T04:53:30.738Z",
                "updated_at": "2022-05-19T04:53:30.738Z"
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