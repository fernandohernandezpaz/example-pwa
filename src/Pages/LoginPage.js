import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Col} from 'react-bootstrap';
import LoginService from '../Services/LoginService';
import CursosService from '../Services/CursosService';
import Dexie from 'dexie';

const LoginPage = () => {
    let history = useHistory();
    const initSession = (event) => {
        event.preventDefault();
        let db = new Dexie("webdb");

        db.version(1).stores({
            user: "++id, username, token, email"
        });

        db.version(1).stores({
            curso: "++id, nombre, slug, descripcion, foto, curso_temas, syncro"
        });

        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        LoginService.login(credentials)
            .then((response) => {
                LoginService.setSession(response.data);
                CursosService.cursos()
                    .then(response => {
                        db.curso.bulkAdd(
                            response.data.map(curso => ({
                                id: curso.id,
                                nombre: curso.nombre,
                                slug: curso.slug,
                                curso_temas: curso.curso_temas,
                                descripcion: curso.descripcion,
                                foto: curso.foto,
                                syncro: true
                            }))
                        )
                    });
                history.push('/dashboard');

            });
    }

    return (
        <Col xs="12" md="12" lg="12">
            <Container>
                <Form className="form-control" onSubmit={initSession}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Inciar sesion
                    </Button>
                </Form>
            </Container>
        </Col>
    )

}

export default LoginPage;