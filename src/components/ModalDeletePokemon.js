import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCancel } from '@fortawesome/free-solid-svg-icons'

export const ModalDeletePokemon = ({ name, message, toggleClose, deletePokemonById, idPokemonDelete }) => {
    //console.log({nombre: name});
    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" data-testid="closeModal" onClick={toggleClose}>&times;</span>
                    <p ><b>Eliminar Pokemon</b></p>
                    <div className="row">
                        <p data-testid="titleDelete">Está seguro que desea eliminar el pokemon<b>{` ${name}`}</b>?</p>
                        <div className="containerButton">
                            <button
                                type="submit"
                                onClick={() => deletePokemonById(idPokemonDelete)}
                                //disabled={name === "" || image === ""}
                                id="buttonSave"
                                className="buttonForm"

                            ><FontAwesomeIcon
                                    icon={faCheck}
                                />&nbsp; Confirmar</button>

                            <button
                                onClick={toggleClose}
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
