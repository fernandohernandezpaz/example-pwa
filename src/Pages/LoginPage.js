import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Row, Col} from 'react-bootstrap';
import LoginService from '../Services/LoginService';

const LoginPage = () => {
    let history = useHistory();
    const initSession = (event) => {
        event.preventDefault();

        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        LoginService.login(credentials)
            .then((response) => {
                LoginService.setSession(response.data);
                console.log(LoginService.getSession());
                console.log(LoginService.getToken());

            });
    }


    return (
        <Container className={'mt-2'}>
            <Row>
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
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPage;