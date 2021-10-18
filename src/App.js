import './App.css';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import CursosPage from './Pages/CursosPage';
import FincaPage from './Pages/FincaPage';
import DetalleDocumentoPage from './Pages/DetalleDocumentoPage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Container, Row} from 'react-bootstrap';

function App() {
    return (
        <Router>
            <div className="App">
                <Container className={'mt-2'}>
                    <Row>
                        <Switch>
                            <Route path="/" exact component={LoginPage}/>
                            <Route path="/dashboard" component={DashboardPage}/>
                            <Route path="/documentaciones/" component={CursosPage}/>
                            <Route path="/documentacion/:temaSlug" component={DetalleDocumentoPage}/>
                            <Route path="/fincas" component={FincaPage}/>
                        </Switch>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}

export default App;
