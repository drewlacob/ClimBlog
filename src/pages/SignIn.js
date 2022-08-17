import React from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const SignIn = () => {
  return (
    <Button
    component={Link}
    to='/feed'
    >
    Sign In
    </Button>
  )
}

export default SignIn