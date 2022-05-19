import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './../styles/styles.css'

export const TablePokemons = ({ pokemons, togglEdit, toggleDelete, messageNoPokemons, setPokemons }) => {
    //console.log({pokemonesNormal: pokemons});
    //console.log({pokemonesRevertidos: [...pokemons].reverse()});
    const [toggleAngle, setToggleAngle] = useState(false);

    const revertirOrder = () => {
        //console.log("revirtiendo");
        setToggleAngle(!toggleAngle);
        setPokemons([...pokemons].reverse());
    }

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th scope="col">
                        Nombre
                        {toggleAngle ? <FontAwesomeIcon icon={faAngleUp} size="xs"
                            onClick={() => revertirOrder()} className="orderRevert" />
                            : <FontAwesomeIcon icon={faAngleDown} size="xs"
                                onClick={() => revertirOrder()} className="orderRevert" />
                        }

                    </th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Ataque</th>
                    <th scope="col">Defensa</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pokemons && pokemons.length > 0 ? (pokemons.map((pokemon, i) => (
                    <tr key={i} data-testid="idPokemon">
                        <td data-testid="pokemonName">{pokemon.name}</td>
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
                ))) :
                    (
                        <tr >
                            <td className='idConditionalTd'></td>
                            <td className='idConditionalTd'></td>
                            <td className='idConditionalTd'><p data-testid="pokemonsMessage">{messageNoPokemons}</p></td>
                        </tr>
                    )

                }

            </tbody>
        </table>
    )
}
