import {useState, useEffect} from 'react';
import MainLayout from '../Components/MainLayout';
import {Table, Image, Dropdown, Button, Row, Col, Form} from 'react-bootstrap';
import {FloatingLabel, ProgressBar, Alert} from 'react-bootstrap';
import CursosService from '../Services/CursosService';
import DialogModal from '../Components/DialogModal'
import Dexie from 'dexie';

const CursosPage = () => {
    let db = new Dexie(process.env.REACT_APP_DB_NAME);
    const [cursos, setCursos] = useState([]);
    const [tituloModal, setTituloModal] = useState('');
    const [id, setId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [progreso, setProgreso] = useState(10);
    const [mensaje, setMensaje] = useState(null);

    db.version(1).stores({
        curso: "++id, nombre, descripcion, foto"
    });

    /*console.log(navigator.onLine, 'Estado navegador');
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate()
            .then(function(estimate){
                console.log(`Using ${estimate.usage} out of ${estimate.quota} bytes.`);
            });
    }*/

    useEffect(() => {
        const cursosObtenidos  = await db.cursos.toArray()
        setCursos(cursosObtenidos);
        // if(navigator.onLine) {
        //     db.curso.each(function (obj) {
        //         // console.log(obj.nombre, JSON.stringify(obj));
        //     }).then(function () {
        //         console.log("Finished.");
        //     })
        // }
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const progresarBarra = (progress) => setProgreso(progress)
    const crearModal = () => {
        setTituloModal('Crear curso');
        handleShow();
    }

    const cargarRegistro = (id, accion = null) => {
        handleShow();
        console.log(id, accion);
    }

    const guardarRegistro = (event) => {
        console.log(event);
        event.preventDefault();
        setGuardando(true);
        progresarBarra(20)// 20
        const formData = new FormData();
        const nombre = event.target.nombre.value;
        const descripcion = event.target.descripcion.value;
        const foto =  event.target.foto.files[0];

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
            })
            .catch(error => {
                setGuardando(false);
                progresarBarra(0); //100

                handleClose();
                //
                // db.curso.put({
                //     nombre,
                //     descripcion,
                //     foto
                // });

                setMensaje({
                    mensaje: 'Error al guardar',
                    tipo: 'danger'
                })
                setTimeout(() => {
                    setMensaje(null);
                }, 3000);
            });
    }




    useEffect(() => {
        if (!guardando) {
            CursosService.cursos()
                .then(response => {
                    setCursos(response.data);
                })
                .catch(error => console.log('El token no ha sido seteado'))
        }
    }, [guardando]);


    let rowCursosMarkup = cursos.length > 0 && (
        cursos.map(curso => (
            <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
                <td><Image style={{width: '200px'}} src={`${process.env.REACT_APP_API_DOMAIN}${curso.foto}`} rounded/>
                </td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Acciones
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as="button" eventKey="1"
                                           onClick={() => cargarRegistro(curso.id, 'ver-detalle')}>
                                Ver detalle
                            </Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="2"
                                           onClick={() => cargarRegistro(curso.id, 'editar')}>Editar</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        ))
    )

    return (
        <MainLayout>
            <Row>
                <Col xs="12" md="6" lg="6">
                    <h1>Lista de Cursos</h1>
                </Col>
                <Col xs="12" md="6" lg="6" className={'text-end'}>
                    <Button variant="success" onClick={() => crearModal()}>Crear Curso</Button>
                </Col>
                <Col xs="12" md="12" lg="12">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Curso</th>
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
                    <input type="hidden" value={id} name="id"/>
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