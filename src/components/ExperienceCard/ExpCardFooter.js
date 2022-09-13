import React from 'react'
import { CardActions, Grid, Chip, Rating } from '@mui/material'

const ExpCardFooter = (props) => {
  return (
    <>
    <CardActions sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        {props.grade && 
        <Grid item sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Chip label={props.grade} color="primary" />
        </Grid>}
        {!(props.rating === '0') &&
        <Grid item>
          <Rating
            name="rating"
            value={parseInt(props.rating)}
            readOnly/>
        </Grid>}
    </CardActions>
    </>
  )
}

export default ExpCardFooter