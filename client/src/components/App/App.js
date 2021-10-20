import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import About from '../About/About';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Eat from '../Eat/Eat';
import Menu from '../Menu/Menu';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={'/about'} component={About} />
        <Route exact path={'/signup'} component={Signup} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/eat'} component={Eat} />
        <Route exact path={'/menu'} component={Menu} />
      </Switch>
    </Router>
  );
}

export default App;
