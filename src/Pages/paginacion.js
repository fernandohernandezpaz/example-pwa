import React, {component} from "react";

export class Paginacion extends component {
    render() {
        const {cursosPorPagina, totalCursos, paginar, paginaSig, paginaAnt} = this.props;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalCursos / cursosPorPagina); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className='pagination justify-content-center'>
                    <li className='page-item'>
                        <a onClick={() => paginaAnt()} className='page-link'>Ant.</a>
                    </li>
                    {
                        pageNumbers.map(num => (
                            <li className='page-item' key={num}>
                                <a onClick={() => paginar(num)} href='#' className='page-link'>Ant.</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a onClick={() => paginaSig()} className='page-link'>Prox.</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Paginacion;