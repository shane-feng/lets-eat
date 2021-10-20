import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { signupUser } from '../../api/apiService';
import { setSessionData, getSessionData } from '../../utils';

import { Container, Grid, Typography, Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const containerStyle = { justifyContent: 'center', textAlign: 'center' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

const gridItemStyle = { height: '100px' };

const textFieldStyle = { display: 'block' };

const buttonContainerStyle = { marginTop: '10px', padding: '0 50px', justifyContent: 'flex-end' };

function Signup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const { session } = getSessionData();
  const history = useHistory();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signupUser({ email, firstName, lastName, password });
      setSessionData({ id: data.user._id, email: data.user.email, token: data.token });
      history.push('/eat');
    } catch (error) {
      console.log(error);
    }
  };

  if (session) {
    return <Redirect to="/about" />;
  }

  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <Typography variant="h4" component="div">
        Sign Up
      </Typography>
      <ValidatorForm onSubmit={handleSignup}>
        <Grid container spacing={4} sx={gridContainerStyle}>
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
          <Grid item xs={5} sx={gridItemStyle}>
            <TextValidator
              label="First Name"
              InputLabelProps={{ shrink: true }}
              placeholder="First Name"
              size="normal"
              fullWidth
              sx={textFieldStyle}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              validators={['required', 'matchRegexp:^[a-zA-Zs]+$']}
              errorMessages={['This field is required', 'Must contain only letters']}
            />
          </Grid>
          <Grid item xs={5} sx={gridItemStyle}>
            <TextValidator
              label="Last Name"
              InputLabelProps={{ shrink: true }}
              placeholder="Last Name"
              size="normal"
              fullWidth
              sx={textFieldStyle}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              validators={['required', 'matchRegexp:^[a-zA-Zs]+$']}
              errorMessages={['This field is required', 'Must contain only letters']}
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
              validators={['required', 'minStringLength: 8', 'maxStringLength: 20']}
              errorMessages={[
                'This field is required',
                'Password length must have a minimum of 8 characters',
                'Password length can only have a maximum of 20 characters',
              ]}
            />
          </Grid>
          <Grid container sx={buttonContainerStyle}>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Container>
  );
}

export default Signup;
