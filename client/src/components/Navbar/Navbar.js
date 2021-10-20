import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../api/apiService';
import { getSessionData, clearSessionData } from '../../utils';

import { AppBar, Toolbar, Typography, Button, Link, IconButton, Menu, MenuItem } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';

const appBarStyle = { marginBottom: '50px' };

const typographyStyle = { flexGrow: 1 };

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
  const [loggedIn, setLoggedIn] = useState(false);
  // Sets html element for menu items position to be anchored to
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
      clearSessionData();
      setLoggedIn(false);
      history.push('/about');
    } catch (error) {
      console.log(error);
    }
  };

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
          history.push('/about');
          handleMobileMenuClose();
        }}
      >
        About
      </MenuItem>
      {loggedIn ? (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            history.push('/eat');
            handleMobileMenuClose();
          }}
        >
          Let's Eat
        </MenuItem>
      ) : null}
      {loggedIn ? (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            history.push('/menu');
            handleMobileMenuClose();
          }}
        >
          Menu
        </MenuItem>
      ) : null}
      {loggedIn ? null : (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            history.push('/signup');
            handleMobileMenuClose();
          }}
        >
          Sign Up
        </MenuItem>
      )}
      {loggedIn ? null : (
        <MenuItem sx={menuItemStyle} onClick={() => history.push('/login')}>
          Login
        </MenuItem>
      )}
      {loggedIn ? (
        <MenuItem sx={menuItemStyle} onClick={handleLogoutUser}>
          Logout
        </MenuItem>
      ) : null}
    </Menu>
  );

  useEffect(() => {
    const { session } = getSessionData();
    if (session) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <AppBar position="static" color="default" elevation={0} sx={appBarStyle}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={typographyStyle}>
          Welcome
        </Typography>
        <nav>
          <Link
            sx={navbarItemStyles}
            href="/eat"
            variant="button"
            underline="hover"
            color="textPrimary"
            onClick={() => history.push('/about')}
          >
            About
          </Link>
          {loggedIn ? (
            <Link
              sx={navbarItemStyles}
              href="/eat"
              variant="button"
              underline="hover"
              color="textPrimary"
              onClick={() => history.push('/eat')}
            >
              Let's eat
            </Link>
          ) : null}
          {loggedIn ? (
            <Link sx={navbarItemStyles} href="/menu" variant="button" underline="hover" color="textPrimary">
              Menu
            </Link>
          ) : null}
          {loggedIn ? null : (
            <Link sx={navbarItemStyles} href="/signup" variant="button" underline="hover" color="textPrimary">
              Sign up
            </Link>
          )}
        </nav>
        {loggedIn ? null : (
          <Button sx={navbarItemStyles} color="primary" variant="outlined" onClick={() => history.push('/login')}>
            Login
          </Button>
        )}
        {loggedIn ? (
          <Button sx={navbarItemStyles} color="error" variant="outlined" onClick={handleLogoutUser}>
            Logout
          </Button>
        ) : null}
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
