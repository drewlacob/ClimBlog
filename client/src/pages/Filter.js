import React from 'react'
// import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { Grid } from '@mui/material';
import { getVideoTransformationsWithReactVideo } from '../utils/getCldVideo';
import VideoInput from '../components/videoInput/VideoInput';

const Filter = () => {

  return (
    <Grid container direction="column" sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
      <div>TESTING PAGE</div>
      <Grid item md={6} sx={{height:'50vh'}}>
        <AdvancedVideo style={{maxHeight:'500px'}}
          cldVid={getVideoTransformationsWithReactVideo()}
          id="1"
          controls
        />
      </Grid>
      <Grid item>
        <VideoInput height={300}></VideoInput>
      </Grid>
    </Grid>
  )
}

export default Filter