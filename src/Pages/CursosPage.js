import {useState, useEffect} from 'react';
import MainLayout from '../Components/MainLayout';
import {Table, Image, Button, Row, Col, Form} from 'react-bootstrap';
import {FloatingLabel, ProgressBar, Alert} from 'react-bootstrap';
import CursosService from '../Services/CursosService';
import DialogModal from '../Components/DialogModal'
import {Link} from 'react-router-dom';
import db from "../Utils/DB";


const CursosPage = () => {
    const [cursos, setCursos] = useState([]);
    const [tituloModal, setTituloModal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [progreso, setProgreso] = useState(10);
    const [mensaje, setMensaje] = useState(null);

    const cargarDatos = () => {
        return new Promise(async (resolve, reject) => {
            if (!guardando) {
                if (navigator.onLine) {
                    CursosService.cursos()
                        .then((response) => {
                            if (response.data.length) {
                                setCursos(response.data);
                                CursosService.recolectarDatosCursos(response.data)
                            }
                        })
                        .catch(error => console.log('El token no ha sido seteado'))

                } else {
                    const cursosObtenidos = await db.cursos.toArray();
                    setCursos(cursosObtenidos);
                }
            }
            resolve(true);
        })
    }
    const sincronizarDatos = () => {
        if (navigator.onLine) {
            db.cursos.each(async function (obj) {
                if (!obj.id_db) {
                    const record = obj;
                    await guardarRegistro(record, true);
                } else {
                    console.log('Np ...')
                }
            }).then(function () {
                console.log("Finished.");
            })
        }
    }

    useEffect(() => {
        cargarDatos();
        sincronizarDatos();
    }, [guardando]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const progresarBarra = (progress) => setProgreso(progress)
    const crearModal = () => {
        setTituloModal('Crear documentación');
        handleShow();
    }
    //
    // const cargarRegistro = (id, accion = null) => {
    //     handleShow();
    //     console.log(id, accion);
    // }

    const guardarRegistro = (event, registrosPendientes = false) => {
        if (!registrosPendientes) {
            event.preventDefault();
        }

        setGuardando(true);

        progresarBarra(20)// 20
        const formData = new FormData();
        const nombre = registrosPendientes ? event.nombre : event.target.nombre.value;
        const descripcion = registrosPendientes ? event.descripcion : event.target.descripcion.value;
        const foto = registrosPendientes ? event.foto : event.target.foto.files[0];
        const curso_temas = [];
        const syncro = String(navigator.onLine);

        progresarBarra(25)//25
        formData.append('nombre', nombre)
        formData.append('descripcion', descripcion)
        formData.append('foto', foto)

        progresarBarra(55)//55
        formData.append(
            'fecha_desde', `2021-${Math.floor(Math.random() * 11) + 1}-${Math.floor(Math.random() * 28) + 1}`
        )
        progresarBarra(80)//80
        formData.append(
            'fecha_hasta', `2021-${Math.floor(Math.random() * 11) + 1}-${Math.floor(Math.random() * 28) + 1}`
        );

        CursosService.crearCurso(formData)
            .then((response) => {
                progresarBarra(100)//100
                setTimeout(() => {
                    setMensaje({
                        mensaje: response.data.message,
                        tipo: 'success'
                    })
                    setGuardando(false);
                    progresarBarra(0)
                }, 1000);

                if (registrosPendientes) {
                    db.cursos.delete(event.id);
                }
            })
            .catch(error => {
                setGuardando(false);
                progresarBarra(0); //100

                handleClose();
                if (!navigator.onLine && !registrosPendientes) {
                    db.cursos.put({
                        nombre,
                        descripcion,
                        foto,
                        curso_temas,
                        syncro
                    });
                }

                setMensaje({
                    mensaje: 'Error al guardar',
                    tipo: 'danger'
                })
                setTimeout(() => {
                    setMensaje(null);
                }, 3000);
            });
    }

    let rowCursosMarkup = cursos.length > 0 && (
        cursos.map(curso => (
            <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
                <td><Image style={{width: '200px'}} src={`${process.env.REACT_APP_API_DOMAIN}${curso.foto}`} rounded/>
                </td>
                <td>
                    {
                        curso.slug !== null && curso.slug !== undefined ? <Link to={`/documentacion/${curso.slug}`}>
                            Leer documentación
                        </Link> : null
                    }
                </td>
            </tr>
        ))
    )

    return (
        <MainLayout>
            <Row>
                <Col xs="12" md="6" lg="6">
                    <h1>Lista de Documentos</h1>
                </Col>
                <Col xs="12" md="6" lg="6" className={'text-end'}>
                    <Button variant="success" onClick={() => crearModal()}>Crear Documentación</Button>
                </Col>
                <Col xs="12" md="12" lg="12">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Documento</th>
                            <th>Descripción</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rowCursosMarkup}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <DialogModal show={showModal} title={tituloModal} onHide={() => handleClose()}>
                <Form onSubmit={guardarRegistro}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nombre"
                        className="mb-3"
                    >
                        <Form.Control type="text" required name="nombre" placeholder="Nombre"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                            name="descripcion"
                            as="textarea"
                            required
                            placeholder="Description del curso"
                            style={{height: '150px'}}
                        />
                    </FloatingLabel>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="foto" required accept=".png,.jpg"/>
                    </Form.Group>

                    {
                        !guardando && (<Button variant="success" type="submit" className={'w-100'}>
                            Guardar
                        </Button>)
                    }
                    {
                        guardando &&
                        <ProgressBar animated now={progreso}/>
                    }
                    {
                        mensaje && (
                            <Alert key={mensaje.mensaje.length} variant={mensaje.tipo} className={'mt-2'}>
                                {mensaje.mensaje}
                            </Alert>)
                    }
                </Form>
            </DialogModal>
        </MainLayout>
    )
}

export default CursosPage;