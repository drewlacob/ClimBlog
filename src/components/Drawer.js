import * as React from 'react';
import {Box,
        SwipeableDrawer,
        List,
        Divider,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
        IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import SortIcon from '@mui/icons-material/Sort';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {Link , useNavigate} from 'react-router-dom';

import { UserContext } from '../UserContext';

export default function SwipeableTemporaryDrawer() {
  const { isLoggedIn } = React.useContext(UserContext);
  const [, setIsLoggedInValue] = isLoggedIn;
  const [isOpen, setIsOpen] = React.useState(false);
  const nav = useNavigate();

  function toggleDrawer () {
    setIsOpen(isOpen => !isOpen);
  }

  const handleLogOut = () => {
    setIsLoggedInValue(false);
    nav('/');
  }

  const list = () => (
    <Box
      sx={{ width: '20vw', minWidth: '250px' }}
      role="presentation"
      onClick={() => setIsOpen(false)}
      onKeyDown={() => setIsOpen(false)}
    >
      <List>
        <ListItem component={Link} to='/' sx={{color: 'rgba(0, 0, 0, 0.87)'}} key="Feed" disablePadding>
            <ListItemButton>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText>My Feed</ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem key="Filters" disablePadding>
            <ListItemButton>
                <ListItemIcon><SortIcon/></ListItemIcon>
                <ListItemText>Filters</ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem key="Post" disablePadding>
            <ListItemButton>
                <ListItemIcon><CreateIcon/></ListItemIcon>
                <ListItemText>Create Post</ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem component={Link} to='/profile' sx={{color: 'rgba(0, 0, 0, 0.87)'}} key="Profile" disablePadding>
            <ListItemButton>
                <ListItemIcon><PersonIcon/></ListItemIcon>
                <ListItemText>My Profile</ListItemText>
            </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Logout" onClick={handleLogOut} disablePadding>
            <ListItemButton>
                <ListItemIcon><LogoutIcon/></ListItemIcon>
                <ListItemText sx={{color: 'red'}}>Logout</ListItemText>
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
          <IconButton sx={{color:'white'}} onClick={toggleDrawer}>
            <MenuIcon/>
          </IconButton>
          <SwipeableDrawer
            anchor='right'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => {}}
          >
            {list()}
          </SwipeableDrawer>
    </>
  );
}
