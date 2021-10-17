import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Col} from 'react-bootstrap';
import LoginService from '../Services/LoginService';
import CursosService from '../Services/CursosService';
import FincasService from '../Services/FincasService';
import Dexie from 'dexie';

const LoginPage = () => {
    let history = useHistory();
    const initSession = (event) => {
        event.preventDefault();
        let db = new Dexie(process.env.REACT_APP_DB_NAME);

        db.version(1).stores({
            user: "++id, username, token, email",
            cursos: "++id, id_db, nombre, slug, descripcion, foto, curso_temas, syncro",
            fincas: '++id, id_db, hectareas, user_id, activo, foto, syncro'
        });

        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        LoginService.login(credentials)
            .then((response) => {
                if (response.status === 200) {
                    db.user.put(response.data);
                    LoginService.setSession(response.data);
                    CursosService.cursos()
                        .then(response => {
                            if (response.data.length) {
                                CursosService.recolectarDatosCursos(response.data);
                            }
                        });

                    FincasService.fincas()
                        .then(response => {
                            if (response.data.length) {
                                CursosService.recolectarDatosCursos(response.data);
                            }
                        });
                    history.push('/dashboard');
                }
            })
            .catch(error => {
                if (error.message === 'Network Error') {
                    console.log(db.user.first());
                }
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