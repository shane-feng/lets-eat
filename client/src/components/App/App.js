import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Eat from '../Eat/Eat';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={'/signup'} component={Signup} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/eat'} component={Eat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
