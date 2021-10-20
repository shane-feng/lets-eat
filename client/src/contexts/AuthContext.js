import { useState, createContext } from 'react';
import { getSessionData } from '../utils';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const { session } = getSessionData();
  const [auth, setAuth] = useState(session?.token ? true : false);

  return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
};
