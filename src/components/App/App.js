import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="eat" element={<Eat />} />
          <Route path="menu" element={<Menu />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
