import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

//TODO: REDESIGN EXPERIENCE CARD WITH BETTER LOOK AND MOBILE/DESKTOP SPECIFIC VERSIONS
const ExperienceCard = (props) => {
  return (
    //add style of climb? ex: crimp, jug, hybrid 
    //add location eg outdoor or the gym name
    <Card sx={{ width: '60%', minWidth: '370px', backgroundColor: '#d3d3d3' }}>
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={12} s={7} md={5} l={6} sx={{mr: 5, ml: 2, mt: 2, mb: 2}}>
      <CardMedia
        sx={{ border: 10, borderColor: 'white', borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
        borderBottomRightRadius: "8px", objectFit: "fill" }}
        component="img"
        alt="Media Content"
        height="280vh"
        image={props.imageURL}
      />
      </Grid>
      <Grid item alignContent="center" alignItems="center" md={4} l={6}>
      <CardContent>
        <Grid container direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div" sx={{width: 'auto'}}>
          {props.title}
          </Typography>
          <Typography variant="h5" component="div">
          {props.date}
          </Typography>
          <Typography variant="h5" component="div">
          Climbed by {props.firstName}
          </Typography>
        </Grid>
      <Grid item>
      <Typography variant="body2" color="text.secondary">
        {props.description}
      </Typography>
      </Grid>
      </CardContent>
        <CardActions>
          {props.grade && 
          <Grid item>
          <Typography color="primary">Grade: </Typography>
          <Chip label={props.grade} color="primary" />
          </Grid>}
          {!(props.rating === '0') &&
          <Grid item>
          <Typography color="primary">Rating: </Typography>
          <Rating
            name="rating"
            value={parseInt(props.rating)}
            readOnly/>
          </Grid>}
        </CardActions>
      </Grid>
    </Grid>
  </Card>
  )
}

export default ExperienceCard