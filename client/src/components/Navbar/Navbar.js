import React from 'react';
import {AppBar,
        Box,
        Toolbar,
        Typography,
        Container,
        Icon} from '@mui/material';  
import {Link} from 'react-router-dom';

import Drawer from '../Drawer';
import Logo from '../Logo';
import { UserContext } from '../../UserContext';
import TransparentOnScroll from './TransparentOnScroll';

const ResponsiveAppBar = () => {
  const { isLoggedIn } = React.useContext(UserContext);
  const [isLoggedInValue, ] = isLoggedIn;

  return (
    <TransparentOnScroll>
    <AppBar position="sticky">
      <Container maxWidth="false">
        <Toolbar>
          <Icon sx={{ display: 'flex', minWidth: 50, minHeight: 65, mr: 0.5}}><Logo/></Icon>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to='/'
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClimBlog
          </Typography>
          {isLoggedInValue &&
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <Drawer/>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
   </TransparentOnScroll>
  );
};
export default ResponsiveAppBar;
