import './App.css';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import CursosPage from './Pages/CursosPage';
import TestPage from './Pages/TestPage';

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
                            <Route path="/cursos" component={CursosPage}/>
                            <Route path="/test" component={TestPage}/>
                        </Switch>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}

export default App;
