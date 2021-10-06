import { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const containerStyle = { justifyContent: 'center' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

const gridItemStyle = { height: '100px' };

const textFieldStyle = { display: 'block' };

function Signup() {
  const [info, setInfo] = useState({ email: '', firstName: '', lastName: '', password: '' });

  const handleSignup = () => {};

  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <ValidatorForm onSubmit={handleSignup}>
        <Grid container spacing={2} sx={gridContainerStyle}>
          <Grid item xs={10} sx={gridItemStyle}>
            <TextValidator
              label="Email"
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
              size="normal"
              fullWidth
              sx={textFieldStyle}
              value={info.email}
              onChange={(event) => setInfo({ email: event.target.value })}
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
              value={info.firstName}
              onChange={(event) => setInfo({ firstName: event.target.value })}
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
              value={info.lastName}
              onChange={(event) => setInfo({ lastName: event.target.value })}
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
              value={info.password}
              onChange={(event) => setInfo({ password: event.target.value })}
              validators={['required', 'minStringLength: 8', 'maxStringLength: 20']}
              errorMessages={[
                'This field is required',
                'Password length must have a minimum of 8 characters',
                'Password length can only have a maximum of 20 characters',
              ]}
            />
          </Grid>
          <Grid container xs={10} sx={{ marginTop: '10px', justifyContent: 'flex-end' }}>
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
