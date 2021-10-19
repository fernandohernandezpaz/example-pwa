import React, {useState, useEffect} from "react";
import MainLayout from '../Components/MainLayout';
import {Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import MediaServices from "../Services/MediaServices";
import db from "../Utils/DB";

const DashboardPage = () => {
    const [documentosLeidos, setDocumentosLeidos] = useState([]);
    // MediaServices.guardarMedia();
    // MediaServices.obtenerURls()
    //     .then(response => {
    //         for(const url of response) {
    //             console.log(url);
    //         }
    //     });

    useEffect(() => {
        async function cargarDatosDashboard() {
            const cursos = await db.cursos.toArray();
            let documentosLeidos = await db.documentacionLeida.toArray();
            documentosLeidos = documentosLeidos.sort((a, b) => b.posicion - a.posicion)
            let data = [], maxRegistros = Number(process.env.REACT_APP_MAX_CONTENIDO ?? 5);
            for (const curso of cursos) {
                console.log(curso.id_db);
                const documentoEncontrado = documentosLeidos.find(documento => {
                    return documento.curso_id === curso.id_db
                })

                if (documentoEncontrado) {
                    const tema = curso.curso_temas.find(tema => tema.id === documentoEncontrado.tema_id)

                    data.push({
                        curso_id: documentoEncontrado.curso_id,
                        nombre: curso.nombre,
                        foto: curso.foto,
                        slug: curso.slug,
                        tema: tema ? tema['nombre'] : '',
                        posicion: documentoEncontrado.posicion
                    });

                    if (maxRegistros === data.length) {
                        break;
                    }
                    documentosLeidos = documentosLeidos.filter(documento => {
                        return Number(documento.curso_id) !== curso.id
                    });
                }
            }
            setDocumentosLeidos(data);
        }

        cargarDatosDashboard();
    }, []);

    const guardarStorage = (ultimaPosicion) => {
        localStorage.setItem('posicion_tema', ultimaPosicion);
    }


    const documentosCard = documentosLeidos.length > 0 && (
        documentosLeidos.map(documento => (
            <Col sm="6" md="4" lg="3" key={`col-doc-${documento.curso_id}`}>
                <Card style={{width: '18rem'}} key={`card-doc-${documento.curso_id}`}>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_API_DOMAIN}${documento.foto}`}/>
                    <Card.Body>
                        <Card.Title>{documento.nombre}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Link to={`/documentacion/${documento.slug}`}
                              onClick={() => guardarStorage(documento.posicion)}
                              className={'btn btn-primary'}>Continuar lectura</Link>
                    </Card.Body>
                </Card>
            </Col>
        ))
    );
    console.log(documentosLeidos);
    return (
        <MainLayout>
            <Row>
                <Col sm="12" md="12" lg="12">
                    <h1>Bienvenido</h1>
                </Col>
                {documentosCard.length > 0 ? <>
                    <hr/>
                    <Col sm="12" md="12" lg="12">
                        <h3>Ultimos documentos leidos</h3>
                    </Col>
                </> : null}
                {documentosCard}
            </Row>
        </MainLayout>
    )
}

export default DashboardPage;