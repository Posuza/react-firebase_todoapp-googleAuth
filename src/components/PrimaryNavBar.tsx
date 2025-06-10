import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Home', 'Profile'];
const settings = ['Profile', 'Logout'];
const drawerWidth = 240;

const PrimaryNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (page: string) => {
    if (page.toLowerCase() === 'logout') {
      signOut(auth).then(() => {
        navigate("/login");
      }).catch((error) => {
        console.error(error);
      });
    } else {
      navigate(`/${page.toLowerCase() === 'home' ? "" : page.toLowerCase()}`);
    }
    setMobileOpen(false);
  };

  const drawer = (<Box 
  onClick={handleDrawerToggle} 
  sx={{ 
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    '& .MuiListItemButton-root': {
      backgroundColor: 'primary.main',
      my: 1,
      mx: 2,
      borderRadius: 1,
      '&:hover': {
        backgroundColor: 'primary.dark',
      }
    },
    '& .MuiListItemText-primary': {
      color: 'white',
    },
    '& .MuiDivider-root': {
      backgroundColor: 'primary.light',
      my: 2
    }
  }}
>
  <List>
    {pages.map((page) => (
      <ListItem key={page} disablePadding>
        <ListItemButton
          sx={{ textAlign: 'center' }}
          onClick={() => handleNavigation(page)}
        >
          <ListItemText primary={page} />
        </ListItemButton>
      </ListItem>
    ))}
    <Divider />
    {settings.map((setting) => (
      <ListItem key={setting} disablePadding>
        <ListItemButton
          sx={{ textAlign: 'center' }}
          onClick={() => handleNavigation(setting)}
        >
          <ListItemText primary={setting} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
</Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default PrimaryNavBar;
