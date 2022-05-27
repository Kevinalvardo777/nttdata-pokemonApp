import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export const Paginacion = ({pagina, setPagina, maximo}) => {

    const [numberPage, setNumberPage] = useState(1);

    const nextPage = () => {
        if(pagina < maximo) {
            setPagina(pagina + 1);
            setNumberPage(numberPage + 1);
        }
    }
    const previousPage = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
            setNumberPage(numberPage - 1)
        }
        
    }
    return (
        <div className='containerPagination'>
            <button className='buttonPage' onClick={previousPage} disabled={pagina === 1}>
                <FontAwesomeIcon 
                    icon={faCaretLeft}
                />
            </button>
            <p>{numberPage} de {maximo} </p>
            <button className='buttonPage' onClick={nextPage} disabled={pagina === maximo}>
                <FontAwesomeIcon 
                    icon={faCaretRight}
                />
            </button>
        </div>
    )
}
