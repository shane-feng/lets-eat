import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Link, IconButton, Menu, MenuItem } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';

const navbarItemStyles = {
  margin: '9px',
  display: {
    xs: 'none',
    md: 'inline',
  },
};

const menuStyle = {
  display: {
    xs: 'block',
    md: 'none',
  },
};

const menuItemStyle = {
  fontSize: '20px',
  width: '130px',
};

function Navbar() {
  // Sets html element for menu items position to be anchored to
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const renderMobileMenu = (
    <Menu
      sx={menuStyle}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={'mobile-menu'}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        sx={menuItemStyle}
        onClick={() => {
          history.push('/');
          handleMobileMenuClose();
        }}
      >
        Let's Eat
      </MenuItem>
      <MenuItem
        sx={menuItemStyle}
        onClick={() => {
          history.push('/menu');
          handleMobileMenuClose();
        }}
      >
        Menu
      </MenuItem>
      <MenuItem
        sx={menuItemStyle}
        onClick={() => {
          history.push('/signup');
          handleMobileMenuClose();
        }}
      >
        Sign Up
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={() => history.push('/login')}>
        Login
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={() => history.push('/logout')}>
        Logout
      </MenuItem>
    </Menu>
  );

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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon sx={menuStyle} />
        </IconButton>
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  );
}

export default Navbar;
