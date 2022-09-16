import React from 'react';
import { Grid } from '@mui/material';
import VideoInput from '../components/videoInput/VideoInput';

const Filter = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
      }}
    >
      <div>TESTING PAGE</div>
      <Grid item>
        <VideoInput height={300}></VideoInput>
      </Grid>
    </Grid>
  );
};

export default Filter;
