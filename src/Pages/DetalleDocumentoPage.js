import React, {useEffect, useState} from 'react'
import MainLayout from "../Components/MainLayout";
import {Image, Button, Row, Col, Container} from 'react-bootstrap';
import Dexie from "dexie";
import ReactPaginate from 'react-paginate';

const DetalleDocumentoPage = (props) => {
    const [curso, setCurso] = useState(null);
    const [tema, setTema] = useState(null);
    const [subtemas, setSubtemas] = useState([]);
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
        setCurso(record)
        setCantidadTemas(record.curso_temas.length);

    }, []);

    useEffect(() => {
        if (curso) {
            const {curso_temas} = curso;
            if (curso_temas.length) {
                setTema(curso_temas[0])
            } else {
                setTema(null)
            }

        }
    }, [curso]);

    useEffect(() => {
        if (tema) {
            const {tema_subtemas} = tema;
            setSubtemas(tema_subtemas);
        } else {
            setSubtemas([]);
        }
    }, [tema])

    const paginar = (data) => {
        let selected = data.selected;
        setTema(curso.curso_temas[selected])
    };
    const contenidoDescriptivoTema = subtemas.length > 0 && (subtemas.map((subtema, index) => (
        (index + 1) % 2 === 0 ? <>
            <Col xs="12" md="6" lg="6" key={`left-image-${subtema.id}`}>
                <Image src={`${process.env.REACT_APP_API_DOMAIN}${subtema.foto}`}/>
            </Col>
            <Col xs="12" md="6" lg="6" key={`right-content-${subtema.id}`}>
                <h4>{subtema.titulo}</h4>
                <div dangerouslySetInnerHTML={{__html: subtema.descripcion}}/>
            </Col>
        </> : <>
            <Col xs="12" md="6" lg="6" key={`left-content-${subtema.id}`}>
                <h4>{subtema.titulo}</h4>
                <div dangerouslySetInnerHTML={{__html: subtema.descripcion}}/>
            </Col>
            <Col xs="12" md="6" lg="6" key={`right-image-${subtema.id}`}>
                <Image src={`${process.env.REACT_APP_API_DOMAIN}${subtema.foto}`}/>
            </Col>
        </>
    )));

    const detalleTema = tema !== null && (<Col xs="12" md="12" lg="12">
        <Container fluid>
            <Row>
                <Col xs="12" md="12" lg="12">
                    <h3>{tema.titulo}</h3>
                </Col>
                {contenidoDescriptivoTema}
            </Row>
        </Container>
    </Col>);

    const detalleCurso = curso !== null && (<>
        <Row>
            <Col xs="12" md="12" lg="12">
                <Image src={`${process.env.REACT_APP_API_DOMAIN}${curso.foto}`}/>
            </Col>
            <Col xs="12" md="12" lg="12">
                <h2 className={'text-center'}>Documento: {curso.nombre}</h2>
            </Col>
            {detalleTema}
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
                onPageChange={paginar}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                nexClassName={'page-item'}
                breakClassName={'break-me'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                activeClassName={'active'}
            />
        </MainLayout>
    )
}

export default DetalleDocumentoPage;