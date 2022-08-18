import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const experienceCard = () => {
  return (
    <Card sx={{ maxWidth: '70%' }}>
    <CardMedia
      component="img"
      alt="bouldering stock img"
      height="140"
      image={require("../../images/bouldering-stock-img.jpg")}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        First V4!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This was the first V4 that I climbed at Vital Carlsbad. 
        It was a tough overhanging boulder that required
        several drop knees!
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  )
}

export default experienceCard