import React from 'react';
import { Typography } from '@mui/material';

const ExpCardDesc = (props) => {
  return (
    <Typography variant="body2" color="text.secondary">
      {props.description}
    </Typography>
  );
};

export default ExpCardDesc;
