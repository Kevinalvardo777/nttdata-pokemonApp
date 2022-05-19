import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons'
import './../styles/styles.css'

export const ModalPokemon = (
    {idPokemon, name, image, ataque, defensa,
    toggle, setName, setAtaque, setImage,                
    setDefensa, message, handleSubmit, updatePokemonById
}) => {
    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={toggle}>&times;</span>
                    <p ><b>{`${idPokemon === null ? "Nuevo Pokemon": `Editar Pokemon ${name}`}`}</b></p>
                    <div className="row">
                        <div className="col">
                            <div className="labelStyle">
                                <label htmlFor="">Nombre: </label>
                            </div>
                            <div className="inputStyle">
                                <input
                                    type="text"
                                    id="name"
                                    data-testid="name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="labelStyle">
                                <label htmlFor="">Ataque: </label>
                            </div>
                            <div className="inputStyle">
                                <input
                                    type="range"
                                    min={0}
                                    step={1}
                                    max={100}
                                    value={ataque}
                                    onChange={(e) => setAtaque(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="labelStyle">
                                <label htmlFor="">Imagen: </label>
                            </div>
                            <div className="inputStyle">
                                <input
                                    type="text"
                                    placeholder='url'
                                    data-testid="image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            
                        </div>
                        <div className="col">
                            <div className="labelStyle">
                                <label htmlFor="">Defensa: </label>
                            </div>
                            <div className="inputStyle">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={defensa}
                                    onChange={(e) => setDefensa(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="containerButton">
                            <button
                                type="submit"
                                onClick={idPokemon === null ? handleSubmit : updatePokemonById}
                                disabled={name === "" || image === ""}
                                id="buttonSave"
                                data-testid="buttonSave"
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
