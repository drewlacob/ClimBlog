import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

const ExpCardHeader = (props) => {
  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="h5" component="div">
          {props.date}
        </Typography>
        <Typography variant="h5" component="div">
          {props.username}
        </Typography>
      </Grid>
      <Divider sx={{ borderWidth: 0.25 }}></Divider>
    </>
  );
};

export default ExpCardHeader;
