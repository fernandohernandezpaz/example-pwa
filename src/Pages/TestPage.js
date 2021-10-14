import {Container, Row, Col} from 'react-bootstrap';
import Navbar from '../Components/Navbar';

const TestPage = () => {

    return (
        <Container className={'mt-2'}>
            <Row>
                <Col xs="12" md="12" lg="12">
                    <Container>
                        <Navbar/>
                        <h2>Hola</h2>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default TestPage;