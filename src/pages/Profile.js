import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle }  from '@mui/material';

import { getUserProfile, updateUserProfile } from '../utils/clientRequests';
import { UserContext } from '../UserContext';
import { validatePassword } from '../utils';

const Profile = () => {
  const { userID } = React.useContext(UserContext);
  const [user_id, ] = userID;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('')
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessfullyUpdated(false)
    setHasError('');
    const data = new FormData(event.currentTarget);
    var firstName = data.get('firstname');
    var lastName = data.get('lastname')
    var password = data.get('password');
    var password2 = data.get('password2')
    console.log('email: ' + email + ' first: ' + firstName + ' last: ' + lastName + ' new pass: ' + password);

    //check passwords same
    if (password !== password2){
      setHasError('Passwords do not match!');
      return;
    }
    if (password && password2 && !validatePassword(password)){
      setHasError('Password must have at least one lowercase letter, one uppercase letter, and one number!');
      return;
    }

    console.log('HITTING API WITH UPDATE REQUEST');
    updateUserProfile(user_id, firstName, lastName, password).then(setSuccessfullyUpdated(true));
  }

  useEffect(() => {
    async function fetchAndSetData() {
      const profile = await getUserProfile(user_id);
      console.log(profile);

      setEmail(profile.email)
      // if(profile.first_name)
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setIsLoading(false);
    }
    console.log('use effect on load: fetching and setting data')
    fetchAndSetData();
  }, [user_id]);

  return (
    <Grid container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
        <Typography>Your Profile</Typography>
        <Typography textAlign={'center'}>
          Here you can view or change your profile, such as
          adding your name or changing your password!
        </Typography>
        {!isLoading && 
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80vw'}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            defaultValue={firstName == null ? '' : firstName}
            name="firstname"
            autoFocus
            InputLabelProps={{ shrink: firstName?true:false }}
            onChange={(e)=>setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            defaultValue={lastName == null ? '' : lastName}
            name="lastname"
            autoFocus
            InputLabelProps={{ shrink: lastName?true:false }}
            onChange={(e)=>setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            disabled
            InputLabelProps={{ shrink: lastName?true:false }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Retype New Password"
            type="password"
            id="password2"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
          Update
          </Button>
          {hasError && <Alert severity="error" variant="filled" sx={{width:'100%', padding: '6px 0px', 
                        "& .MuiAlert-icon": { padding: '7px 7px'}} }>
                <AlertTitle>Error</AlertTitle>
                    {hasError}
              </Alert>}
          {successfullyUpdated && <Alert severity="success" variant="filled" sx={{width:'100%', padding: '6px 0px',
                                  "& .MuiAlert-icon": { padding: '7px 7px'}} }>
                <AlertTitle>Success</AlertTitle>
                    Your profile has been updated!
              </Alert>}
        </Box>
        }
    </Grid>
  )
}

export default Profile