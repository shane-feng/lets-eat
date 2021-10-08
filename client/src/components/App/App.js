import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={'/signup'} component={Signup} />
          <Route exact path={'/login'} component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
