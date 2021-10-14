import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Row, Col} from 'react-bootstrap';
import {login} from '../API/login';

class LoginPage extends Component {

    initSession(event) {
        event.preventDefault();
        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        login(credentials).then((response) => {
            const { data } = response;
            let userData = {
                id: data['id'],
                username: data['username'],
                token: data['token'],
                email: data['email']
            };
            console.log(userData);
        })
    }

    render() {
        return (
            <Container className={'mt-2'}>
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <Container>
                            <Form className="form-control" onSubmit={this.initSession}>
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
            </Container>)
    }
}
export default LoginPage;