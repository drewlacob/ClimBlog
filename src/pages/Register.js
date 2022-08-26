import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle }  from '@mui/material';

import { validateEmail, validatePassword } from '../utils';
//import { createAccount } from '../utils/clientRequests';

const Register = () => {
    const [hasError, setHasError] = React.useState('')

    const handleSubmit = (event) => {
        setHasError('');
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          password2: data.get('password2')
        });
        var email = data.get('email');
        var password = data.get('password');
        var password2 = data.get('password2');

        if(!password || !password2 || !email){
            setHasError('Please fill out all fields!');
            return;
        }
        if (password !== password2){
            setHasError('Passwords do not match!');
            return;
        }
        if(password.length < 8){
            setHasError('Password must be at least 8 characters!');
            return;
        }
        if (!validatePassword(password)){
            setHasError('Password must have at least one lowercase letter, one uppercase letter, and one number!');
            return;
        }
        if(!validateEmail(email)){
            setHasError('Invalid email!')
            return;
        }


        console.log('Hitting that backend bb');

      };

  return (
    <Grid container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
        <Typography>Create An Account</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Retype Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              {hasError && <Alert severity="error" variant="filled">
                <AlertTitle>Error</AlertTitle>
                    {hasError}
              </Alert>}
        </Box>
    </Grid>
  )
}

export default Register