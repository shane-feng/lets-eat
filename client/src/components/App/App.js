import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import About from '../About/About';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Eat from '../Eat/Eat';
import Menu from '../Menu/Menu';

import { AuthContextProvider } from '../../contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={About} />
          <Route exact path={'/signup'} component={Signup} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/eat'} component={Eat} />
          <Route exact path={'/menu'} component={Menu} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
