import {Nav} from 'react-bootstrap';
import {Link, withRouter, useHistory} from 'react-router-dom';
import LoginService from "../Services/LoginService";

const Navbar = () => {
    let history = useHistory();
    const logOutHandler = () => {
        if (navigator.onLine) {
            LoginService.destroySession();
            history.push('/');
        } else {
            Notification.requestPermission()
                .then((result) => {
                    const notifTitle = `ADVERTENCIA`;
                    const notifBody = `Hola, Aun hay tareas pendientes de procesa. Solo podra cerra sesion cuando tengas conexión`;

                    const options = {
                        body: notifBody,
                        icon: null
                    };
                    new Notification(notifTitle, options);
                });
        }
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
                            <Nav.Link as={Link} to="/documentaciones/">Documentacion</Nav.Link>
                        </Nav.Item>
                    )

                }
                {
                    LoginService.isAuthenticated() && (
                        <Nav.Item>
                            <Nav.Link as={Link} to="/fincas/">Fincas</Nav.Link>
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