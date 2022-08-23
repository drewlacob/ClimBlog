import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import {Link} from 'react-router-dom';
import Logo from '../Logo';

import { UserContext } from '../../UserContext';

const pages = ['Add Experience +', 'Filters'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const { isLoggedIn } = React.useContext(UserContext);
  const [isLoggedInValue, setIsLoggedInValue] = isLoggedIn;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    setIsLoggedInValue(true);
  }

  const handleLogOut = () => {
    setAnchorElUser(null);
    setIsLoggedInValue(false);
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="false">
        <Toolbar>
        <Icon sx={{display: { xs: 'none', md: 'flex' }, minWidth: 50, minHeight: 65, mr: 1}}><Logo/></Icon>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: '1',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClimBlog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', paddingLeft: '0px' },
              }}
            >
              {pages.map((page) => (            //fix this shit
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Icon sx={{ display: { xs: 'flex', md: 'none' }, minWidth: 50, minHeight: 65, mr: 0.5}}><Logo/></Icon>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClimBlog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                variant="contained"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, backgroundColor: '#a7bbc4!important', color: 'white', display: 'block', mr: 1 }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLoggedInValue &&
          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'middle',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'middle',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem component={Link} to='/profile' onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem component={Link} to='/settings' onClick={handleCloseUserMenu}>Settings</MenuItem>
                <MenuItem component={Link} to='/' onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </Box>
          }
          {!isLoggedInValue && 
          <Box sx={{ flexGrow: 0 }}>
          <Button
                key='sign-in'
                variant="contained"
                onClick={handleLogin}
                component={Link}
                to='/signin'
                sx={{ my: 2, backgroundColor: '#a7bbc4!important', color: 'white', display: 'block', mr: 0 }}
              >
                Sign In
              </Button>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
