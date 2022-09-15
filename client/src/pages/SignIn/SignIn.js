import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle }  from '@mui/material';
import {Link as routerLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { validateEmail } from '../../utils';
import { UserContext } from '../../UserContext';
import { login } from '../../api/login';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        ClimBlog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const { isLoggedIn, userID, firstName } = React.useContext(UserContext);
  const [, setIsLoggedInValue] = isLoggedIn;
  const [, setUserIDValue] = userID;
  const [, setFirstNameValue] = firstName;
  const [hasLoginError, setHasLoginError] = React.useState('')
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get('email');
    var password = data.get('password');

    if (!(password)){
      setHasLoginError('Invalid credentials!');
      return;
    }
    if(!validateEmail(email)){
      setHasLoginError('Invalid email!')
      return;
    }

    var user = await login(email, password);
    if(typeof user === 'undefined' || typeof user.user_id === 'undefined')
      setHasLoginError('Invalid credentials!')
    else {
      setIsLoggedInValue(true);
      setUserIDValue(user.user_id);
      setFirstNameValue(user.first_name);
      nav("/");
    }
  };

  return (
      <Grid container sx={{ minHeight: '84.7vh', flex: 1 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(' + require('../../images/janjaSignInPhoto.jpg') + ')', //witchcraft
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{ my: 8, mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
              {hasLoginError && <Alert severity="error" variant="filled">
                <AlertTitle>Error</AlertTitle>
                    {hasLoginError}
              </Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs component={routerLink} to='/register'>
                  <Typography variant="body2">Forgot password?</Typography>
                </Grid>
                <Grid item component={routerLink} to='/register'>
                    <Typography variant="body2">Don't have an account? Sign Up</Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}