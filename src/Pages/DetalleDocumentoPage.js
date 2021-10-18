import React, {useEffect, useState} from 'react'
import MainLayout from "../Components/MainLayout";
import { Image, Button, Row, Col} from 'react-bootstrap';
import Dexie from "dexie";
import ReactPaginate from 'react-paginate';

const DetalleDocumentoPage = (props) => {
    const [curso, setCurso] = useState({});
    const [cantidadTemas, setCantidadTemas] = useState(0);

    const slug = props.match.params['temaSlug'];
    let db = new Dexie(process.env.REACT_APP_DB_NAME);

    db.version(1).stores({
        cursos: "++id, id_db, nombre, slug, descripcion, foto, curso_temas, syncro"
    });

    useEffect(async () => {
        const findRecord = async (slug) => {
            if (slug === null || slug === undefined) {
                return null;
            }

            const existeCursoDBLocal = await db.cursos.where({
                slug: slug
            }).first();

            return existeCursoDBLocal;
        };


        const record = await findRecord(slug);

        setCantidadTemas(record.curso_temas.length);
        setCurso(record);
    }, []);

   const handlePageClick = (data) => {
        let selected = data.selected;
    };

    console.log(curso);
    const detalleCurso = curso!== null && (<>
        <Row>
            <Col xs="12" md="12" lg="12">
                <Image src={`${process.env.REACT_APP_API_DOMAIN}${curso.foto}`}/>
            </Col>
            <Col xs="12" md="12" lg="12">
                <h1>{curso.nombre}</h1>
            </Col>
        </Row>
        </>);

    return (
        <MainLayout>
            {detalleCurso}
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={cantidadTemas}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                nexClassName={'page-item'}
                breakClassName={'break-me'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                activeClassName={'active'}
            />
        </MainLayout>
    )
}

export default DetalleDocumentoPage;