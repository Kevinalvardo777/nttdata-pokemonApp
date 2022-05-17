import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import './../styles/styles.css'

export const TablePokemons = ({ pokemons, deletePokemonById, togglEdit, toggleDelete }) => {
    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Ataque</th>
                    <th scope="col">Defensa</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pokemons && pokemons.map((pokemon, i) => (
                    <tr key={i}>
                        <td>{pokemon.name}</td>
                        <td>
                            {pokemon.image.includes("https") ?
                                <img
                                    className='imgStyle'
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    width={20}
                                    height={20}
                                />
                                : <p>{pokemon.name}</p>}

                        </td>
                        <td>{pokemon.attack}</td>
                        <td>{pokemon.defense}</td>
                        <td>
                            <table className='intern-table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() => togglEdit(pokemon.id)}
                                                className="iconStyle"
                                            />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                onClick={() => toggleDelete(pokemon.id)}
                                                className="iconStyle"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
