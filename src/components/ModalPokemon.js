import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons'
import './../styles/styles.css'

export const ModalPokemon = ({toggle, setName, setAtaque, setImage, setDefensa, message, handleSubmit, updatePokemonById,
name, image, ataque, defensa, idPokemon}) => {
    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={toggle}>&times;</span>
                    <p ><b>{`${idPokemon === null ? "Nuevo Pokemon": "Editar Pokemon"}`}</b></p>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">Nombre: </label>
                            <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Ataque: </label>
                            <input
                                type="range"
                                min={0}
                                step={1}
                                max={100}
                                value={ataque}
                                onChange={(e) => setAtaque(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Imagen: </label>
                            <input
                                type="text"
                                placeholder='url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Defensa: </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={defensa}
                                onChange={(e) => setDefensa(e.target.value)}
                            />
                        </div>

                        <div className="containerButton">
                            <button
                                type="submit"
                                onClick={idPokemon === null ? handleSubmit : updatePokemonById}
                                disabled={name === "" || image === ""}
                                id="buttonSave"
                                className={`${name !== "" && image !== "" ? "buttonForm" : "buttonInactive"}`}

                            ><FontAwesomeIcon
                                    icon={faSave}
                                />&nbsp; Guardar</button>

                            <button
                                onClick={toggle}
                                className="buttonForm"
                            ><FontAwesomeIcon
                                    icon={faCancel}
                                />&nbsp; Cancelar</button>
                        </div>
                        <div className="message">{message ? <p>{message}</p> : null}</div>
                    </div>
                </div>

            </div>
        </>
    )
}
