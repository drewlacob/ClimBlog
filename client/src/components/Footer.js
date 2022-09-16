import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <div className="footer">
      <Typography
        varant="h1"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 300,
          letterSpacing: '.2rem',
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
        }}
      >
        ClimBlog
      </Typography>
      <p>&copy; Copyright 2022 All Rights Reserved.</p>
      <p>Created by Drew Lacob</p>
    </div>
  );
};

export default Footer;
