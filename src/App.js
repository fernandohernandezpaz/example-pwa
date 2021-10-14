import './App.css';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import TestPage from './Pages/TestPage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/dashboard" component={MainPage}/>
                    <Route path="/test" component={TestPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
