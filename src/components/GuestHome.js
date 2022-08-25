import React from 'react'
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FeaturesAccordion from './FeaturesAccordion';

const guestHome = () => {
  return (
    <Grid container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
        <Typography> ClimBlog requires an account.</Typography>
        <Box sx={{ flexGrow: 1 }}>
        <Button
          key='sign-in'
          variant="contained"
          component={Link}
          to='/signin'
          sx={{ my: 2, variant:'contained', color: 'white' }}
        >
          Click Here to Sign In or Create an Account
        </Button>
        </Box>
        {/* <Typography sx={{textAlign: "center"}}>CimBlog is a social media and blogging platform built
                    for climbers, by climbers. It is intended for those
                    who want to track their progress and connect with their
                    fellow climbers and friends to see their awesome sends!
        </Typography> */}

        <Grid container direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
            <Grid item xs={10} md={5} direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Typography sx={{textAlign: "center", mb: 2}}>CimBlog is a social media and blogging platform built
                          for climbers, by climbers. It is intended for those who want to track their progress and 
                          connect with their fellow climbers and friends to see their awesome sends. 
              </Typography>
              <Grid item sx={{mb: 2}}>
                <FeaturesAccordion />
              </Grid>
            </Grid>
            <Grid item md={0.25}/>
            <Grid item xs={10} md={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundImage: 'url(' + require('../images/guestHomePhoto.jpg') + ')', //witchcraft
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'right',
                      height: '66.5vh',border: 10, borderColor: '#1976d2', borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
                      borderBottomRightRadius: "8px"}}>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default guestHome