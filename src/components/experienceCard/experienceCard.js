import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

const ExperienceCard = () => {
  const [value, setValue] = React.useState(2);

  return (
    
    <Card sx={{ maxWidth: '60%', backgroundColor: '#d3d3d3' }}>
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={12} s={7} md={5} l={6} sx={{mr: 5, ml: 2, mt: 2, mb: 2}}>
      <CardMedia
        sx={{ border: 10, borderColor: 'white', borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
        borderBottomRightRadius: "8px", objectFit: "fill" }}
        component="img"
        alt="bouldering stock img"
        height="280vh"
        image={require("../../images/bouldering-stock-img.jpg")}
      />
      </Grid>
      <Grid item alignContent="center" alignItems="center" md={4} l={6}>
      <CardContent>
        <Grid container direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div">
          First V4!
          </Typography>
          <Typography variant="h5" component="div">
          8/18/2022
          </Typography>
          <Typography variant="h5" component="div">
          Climbed by Drew
          </Typography>
        </Grid>
      <Grid item>
      <Typography variant="body2" color="text.secondary">
        This was the first V4 that I climbed at Vital Carlsbad. 
        It was a tough overhanging boulder that required
        several drop knees!
        This was the first V4 that I climbed at Vital Carlsbad. 
        It was a tough overhanging boulder that required
        several drop knees!
        This was the first V4 that I climbed at Vital Carlsbad. 
        It was a tough overhanging boulder that required
        several drop knees!
        This was the first V4 that I climbed at Vital Carlsbad. 
      </Typography>
      </Grid>
      </CardContent>
        <CardActions>
          <Grid item>
          <Typography color="primary">Grade: </Typography>
          <Chip label="V3-V4" color="primary" />
          </Grid>
          <Grid item>
          <Typography color="primary">Rating: </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}/>
          </Grid>
        </CardActions>
      
      </Grid>
    </Grid>
  </Card>
  )
}

export default ExperienceCard