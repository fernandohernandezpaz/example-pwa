import Navbar from './Navbar';
import {Container, Col} from 'react-bootstrap';
const MainLayout = (props) => {

    return (
        <Col xs="12" md="12" lg="12">
            <Container>
            <Navbar />
            {props.children}
            </Container>
        </Col>
    )
}

export default MainLayout;