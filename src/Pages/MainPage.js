import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Navbar from '../Components/Navbar';


const MainPage = () => {

    return (
        <Container className={'mt-2'}>
            <Row>
                <Col xs="12" md="12" lg="12">
                    <Container>
                        <Navbar/>
                        <h1>Bienvenido</h1>
                    </Container>
                </Col>
            </Row>
        </Container>)
}

export default MainPage;