import React from 'react'
import './../styles/styles.css'

export const SearchPokemon = ({ busqueda, handleChange }) => {
    return (
        <div>
            <input
                type="search"
                placeholder='Buscar'
                className='search'
                value={busqueda}
                onChange={handleChange}
            />
        </div>
    )
}
