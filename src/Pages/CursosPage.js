import {useState, useEffect} from 'react';
import MainLayout from '../Components/MainLayout';
import {Table, Image, Dropdown, Button, Row, Col} from 'react-bootstrap';
import CursosService from '../Services/CursosService';

const CursosPage = () => {

    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        CursosService.cursos()
            .then(response => {
                setCursos(response.data);
            })
            .catch(error => console.log('El token no ha sido seteado'))
    }, []);

    const cargarRegistro = (id, accion = null) => {
        console.log(id, accion);
    }

    let rowCursosMarkup = cursos.length > 0 && (
        cursos.map(curso => (
            <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
                <td><Image src={`${process.env.REACT_APP_API_DOMAIN}${curso.foto}`} rounded/></td>
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
                    <Button variant="success">Crear Curos</Button>
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
        </MainLayout>
    )
}

export default CursosPage;