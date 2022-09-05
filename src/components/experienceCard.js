import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

const post = {
  // imageURL: "images/bouldering-stock-img.jpg",
  imageURL: "http://res.cloudinary.com/dheqfppu3/image/upload/v1662409276/v36kcdaxiprtgggteqoh.jpg",
  title: "First V4!",
  date: "8/18/2022",
  firstName: "Drew",
  description: "This was the first V4 that I climbed at Vital Carlsbad. It was a tough overhanging boulder that required several drop knees. This was the first V4 that I climbed at Vital Carlsbad. It was a tough overhanging boulder that required several drop knees. This was the first V4 that I climbed at Vital Carlsbad. It was a tough overhanging boulder that required several drop knees.",
  grade: "V3-V4",
  rating: 4
}

const ExperienceCard = () => {
  return (
    //add style of climb? ex: crimp, jug, hybrid 
    //add location eg outdoor or the gym name
    <Card sx={{ maxWidth: '60%', minWidth: '370px', backgroundColor: '#d3d3d3' }}>
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={12} s={7} md={5} l={6} sx={{mr: 5, ml: 2, mt: 2, mb: 2}}>
      <CardMedia
        sx={{ border: 10, borderColor: 'white', borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
        borderBottomRightRadius: "8px", objectFit: "fill" }}
        component="img"
        alt="bouldering stock img"
        height="280vh"
        // image={require("../" + post.imageURL)}
        image={post.imageURL}
      />
      </Grid>
      <Grid item alignContent="center" alignItems="center" md={4} l={6}>
      <CardContent>
        <Grid container direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div">
          {post.title}
          </Typography>
          <Typography variant="h5" component="div">
          {post.date}
          </Typography>
          <Typography variant="h5" component="div">
          Climbed by {post.firstName}
          </Typography>
        </Grid>
      <Grid item>
      <Typography variant="body2" color="text.secondary">
        {post.description}
      </Typography>
      </Grid>
      </CardContent>
        <CardActions>
          <Grid item>
          <Typography color="primary">Grade: </Typography>
          <Chip label={post.grade} color="primary" />
          </Grid>
          <Grid item>
          <Typography color="primary">Rating: </Typography>
          <Rating
            name="rating"
            value={post.rating}
            readOnly/>
          </Grid>
        </CardActions>
      </Grid>
    </Grid>
  </Card>
  )
}

export default ExperienceCard