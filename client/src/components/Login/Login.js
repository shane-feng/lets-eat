import { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { loginUser } from '../../api/apiService';
import { setSessionData } from '../../utils';
import { AuthContext } from '../../contexts/AuthContext';

import { Container, Grid, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const containerStyle = { justifyContent: 'center', textAlign: 'center' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

const gridItemStyle = { height: '100px' };

const textFieldStyle = { display: 'block' };

const buttonContainerStyle = { marginTop: '10px', padding: '0 50px', justifyContent: 'center' };

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser(email, password);
      setSessionData({ id: data.user._id, email: data.user.email, token: data.token });
      setAuth(true);
      history.push('/eat');
    } catch (error) {
      console.log(error);
    }
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <Typography variant="h4" component="div">
        Login
      </Typography>
      <ValidatorForm onSubmit={handleLogin}>
        <Grid container spacing={2} sx={gridContainerStyle}>
          <Grid item xs={10} sx={gridItemStyle}>
            <TextValidator
              label="Email"
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
              size="normal"
              fullWidth
              sx={textFieldStyle}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Invalid email format']}
            />
          </Grid>
          <Grid item xs={10} sx={gridItemStyle}>
            <TextValidator
              label="Password"
              InputLabelProps={{ shrink: true }}
              placeholder="Password"
              size="normal"
              fullWidth
              sx={textFieldStyle}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              validators={['required']}
              errorMessages={['This field is required']}
            />
          </Grid>
          <Grid container sx={buttonContainerStyle}>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Container>
  );
}

export default Login;
