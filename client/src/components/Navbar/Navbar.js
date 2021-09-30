import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const navbarItemStyles = {
  margin: '9px',
  display: {
    xs: 'none',
    md: 'inline',
  },
};

const menuIconStyle = {
  margin: '9px',
  display: {
    xs: 'block',
    md: 'none',
  },
};

function Navbar() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome
        </Typography>
        <nav>
          <Link sx={navbarItemStyles} href="/eat" variant="button" underline="hover" color="textPrimary">
            Let's eat
          </Link>
          <Link sx={navbarItemStyles} href="/menu" variant="button" underline="hover" color="textPrimary">
            Menu
          </Link>
          <Link sx={navbarItemStyles} href="/signup" variant="button" underline="hover" color="textPrimary">
            Sign up
          </Link>
        </nav>
        <Button sx={navbarItemStyles} color="primary" variant="outlined">
          Login
        </Button>
        <Button sx={navbarItemStyles} color="error" variant="outlined">
          Logout
        </Button>
        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
          <MenuIcon sx={menuIconStyle} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
