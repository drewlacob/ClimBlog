import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ExpCardFooter from "./ExperienceCard/ExpCardFooter";

const ViewPostCard = (props) => {
  return (
    <Card elevation={4} sx={{ maxWidth: "70vw", minWidth: "380px", my: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.date}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.username}
          </Typography>
        </Grid>
      </CardContent>
      <CardMedia
        component="img"
        height="undefined"
        image={props.imageURL}
        alt="media"
        sx={{ objectFit: "cover", aspectRatio: 3 / 2 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Grid item sx={{ width: "100%" }}>
          <ExpCardFooter grade={props.grade} rating={props.rating} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ViewPostCard;
