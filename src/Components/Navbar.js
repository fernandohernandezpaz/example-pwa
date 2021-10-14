import {Nav} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

const Navbar = () => {

    return (
        <>
            <Nav
                activeKey="/dashboard"
            >
                <Nav.Item>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/test">Test</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/">Login</Nav.Link>
                </Nav.Item>

            </Nav>
        </>
    )
}

export default withRouter(Navbar);