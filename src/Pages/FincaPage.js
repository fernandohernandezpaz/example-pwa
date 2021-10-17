import {useState, useEffect} from 'react';
import MainLayout from '../Components/MainLayout';
import {Card, Button, Row, Col, Form} from 'react-bootstrap';
import {FloatingLabel, ProgressBar, Alert} from 'react-bootstrap';
import FincasService from '../Services/FincasService';
import DialogModal from '../Components/DialogModal'
import Dexie from 'dexie';
import LoginService from "../Services/LoginService";

const FincaPage = () => {
    let db = new Dexie(process.env.REACT_APP_DB_NAME);
    const [fincas, setFincas] = useState([]);
    const [tituloModal, setTituloModal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [progreso, setProgreso] = useState(10);
    const [mensaje, setMensaje] = useState(null);
    db.version(1).stores({
        fincas: "++id, id_db, hectareas, user_id, activo, foto, syncro"
    });
    const cargarDatos = () => {
        return new Promise(async (resolve, reject) => {
            if (!guardando) {
                if (navigator.onLine) {
                    FincasService.fincas()
                        .then(async (response) => {
                            if (response.data.length) {
                                setFincas(response.data);
                                for (const finca of response.data) {
                                    const existeFincaDBLocal = await db.fincas.where({
                                        id_db: finca.id
                                    }).first();

                                    const registro = {
                                        id_db: finca.id,
                                        hectareas: finca.hectareas,
                                        foto: finca.foto,
                                        syncro: true
                                    };

                                    if (!existeFincaDBLocal) {
                                        db.fincas.add(registro);
                                    } else {
                                        registro['id'] = existeFincaDBLocal.id;
                                        db.fincas.put(registro);
                                    }
                                }
                            }
                        })
                        .catch(error => console.log('El token no ha sido seteado'))

                } else {
                    const fincasObtenidas = await db.fincas.toArray();
                    setFincas(fincasObtenidas);
                }
            }
            resolve(true);
        })
    }
    const sincronizarDatos = () => {
        if (navigator.onLine) {
            db.fincas.each(async function (obj) {
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
        setTituloModal('RegistrarGranja');
        handleShow();
    }

    const guardarRegistro = (event, registrosPendientes = false) => {
        if (!registrosPendientes) {
            event.preventDefault();
        }

        setGuardando(true);

        progresarBarra(20)// 20
        const formData = new FormData();
        const hectareas = registrosPendientes ? event.hectareas : event.target.hectareas.value;
        const user_id = LoginService.getUserId();
        const foto = registrosPendientes ? event.foto : event.target.foto.files[0];
        let activo = registrosPendientes ? event.activo : event.target.activo.value;
        activo = (activo === 'on' || activo === true)
        const syncro = navigator.onLine;

        progresarBarra(25)//25
        formData.append('usuario', user_id)
        formData.append('hectareas', hectareas)
        formData.append('activo', activo)
        formData.append('foto', foto)


        progresarBarra(80)//80


        FincasService.creafFinca(formData)
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
                    db.fincas.delete(event.id);
                }
            })
            .catch(error => {
                setGuardando(false);
                progresarBarra(0); //100

                handleClose();
                if (!navigator.onLine && !registrosPendientes) {
                    console.log(navigator.onLine, !registrosPendientes);
                    db.fincas.put({
                        hectareas,
                        user_id,
                        foto,
                        activo,
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

    let cardFincas = fincas.length > 0 && (
        fincas.map(finca => (
            <Col xs="12" md="4" lg="3">
                <Card key={finca.id} style={{width: '18rem'}}>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_API_DOMAIN}${finca.foto}`}/>
                    <Card.Body>
                        <Card.Title>Granja #{finca.id}</Card.Title>
                        <Card.Text>
                            Granja de {finca.hectareas} hectareas.
                        </Card.Text>
                        <Card.Text>Estado: {finca.activo ? 'Activa' : 'Inactiv'}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    )

    return (
        <MainLayout>
            <Row>
                <Col xs="12" md="6" lg="6">
                    <h1>Mis granjas</h1>
                </Col>
                <Col xs="12" md="6" lg="6" className={'text-end'}>
                    <Button variant="success" onClick={() => crearModal()}>Registrar granja</Button>
                </Col>
                <Col xs="12" md="12" lg="12">
                    <Row>
                        {cardFincas}
                    </Row>
                </Col>
            </Row>

            <DialogModal show={showModal} title={tituloModal} onHide={() => handleClose()}>
                <Form onSubmit={guardarRegistro}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Hectareas de la granja"
                        className="mb-3"
                    >
                        <Form.Control type="number" required name="hectareas" placeholder="Hectareas"/>
                    </FloatingLabel>
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="activo"
                            id="checkbox_activo"
                            label="¿Granja está en funcionamiento?"
                        />
                    </div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Foto de la granja</Form.Label>
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

export default FincaPage;