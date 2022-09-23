import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ExpCardHeader from "./ExpCardHeader";
import ExpCardDesc from "./ExpCardDesc";
import ExpCardFooter from "./ExpCardFooter";

const ExperienceCard = (props) => {
  const postLink = `/view-post/${props.postID}`;

  return (
    <>
      <Card
        component={Link}
        to={postLink}
        elevation={4}
        sx={{
          display: { xs: "none", md: "flex" },
          width: "60%",
          minWidth: "370px",
          textDecoration: "none",
          backgroundColor: "#d3d3d3",
        }}
      >
        <Grid container direction="row" alignItems="stretch" justifyContent="flex-start">
          <Grid item xs={12} sm={5}>
            <CardMedia
              sx={{ objectFit: "fill", height: "100%", minHeight: "100%" }}
              component="img"
              alt="Media Content"
              image={props.imageURL}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6.7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              ml: 0.5,
              mr: 0.5,
            }}
          >
            <Grid item sx={{ width: "100%" }}>
              <ExpCardHeader title={props.title} date={props.date} username={props.username} />
              <ExpCardDesc description={props.description} />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <ExpCardFooter grade={props.grade} rating={props.rating} />
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* MOBILE BELOW */}
      <Card
        component={Link}
        to={postLink}
        sx={{
          display: { xs: "flex", md: "none" },
          textDecoration: "none",
          width: "60%",
          minWidth: "370px",
          backgroundColor: "#d3d3d3",
          boxShadow: "3px 4px black",
        }}
      >
        <Grid container direction="row" alignItems="stretch" justifyContent="flex-start" flexGrow="1">
          <Grid item xs={12} md={5} sx={{ display: "flex", flexGrow: "3" }}>
            <CardMedia
              sx={{ objectFit: "fill", height: "100%", minHeight: "100%" }}
              component="img"
              alt="Media Content"
              image={props.imageURL}
            />
          </Grid>
          <Grid item alignContent="center" alignItems="center" xs={12} md={6.7} sx={{ ml: 0.5, mr: 0.5 }}>
            <Grid container direction="row" justifyContent="space-between">
              <ExpCardHeader title={props.title} date={props.date} username={props.username} />
            </Grid>
            <Divider sx={{ borderWidth: 0.25 }}></Divider>
            <ExpCardDesc description={props.description} />
            <ExpCardFooter grade={props.grade} rating={props.rating} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ExperienceCard;
