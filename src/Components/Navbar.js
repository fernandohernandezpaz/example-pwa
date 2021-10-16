import {Nav} from 'react-bootstrap';
import {Link, withRouter, useHistory} from 'react-router-dom';
import LoginService from "../Services/LoginService";

const Navbar = () => {
    let history = useHistory();
    const logOutHandler = () => {
        LoginService.destroySession();
        history.push('/');
    }
    const loginOpcion = !LoginService.isAuthenticated() && (<Nav.Item>
        <Nav.Link as={Link} to="/">Login</Nav.Link>
    </Nav.Item>);

    const logoutOpcion = LoginService.isAuthenticated() && (<Nav.Item>
        <Nav.Link href="#" onClick={logOutHandler}>Logout</Nav.Link>
    </Nav.Item>);

    return (
        <>
            <Nav
                activeKey="/dashboard"
            >
                <Nav.Item>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                {
                    LoginService.isAuthenticated() && (
                        <Nav.Item>
                            <Nav.Link as={Link} to="/cursos">Cursos</Nav.Link>
                        </Nav.Item>
                    )
                }

                {loginOpcion}
                {logoutOpcion}

            </Nav>
        </>
    )
}

export default withRouter(Navbar);