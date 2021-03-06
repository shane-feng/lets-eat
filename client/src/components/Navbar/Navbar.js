import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/apiService';
import { clearSessionData } from '../../utils';
import { AuthContext } from '../../contexts/AuthContext';

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
  // Sets html element for menu items position to be anchored to
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
      clearSessionData();
      setAuth(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        clearSessionData();
        window.location.reload();
      }
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
          navigate('/');
          handleMobileMenuClose();
        }}
      >
        About
      </MenuItem>
      {auth ? (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            navigate('/eat');
            handleMobileMenuClose();
          }}
        >
          Let's Eat
        </MenuItem>
      ) : null}
      {auth ? (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            navigate('/menu');
            handleMobileMenuClose();
          }}
        >
          Menu
        </MenuItem>
      ) : null}
      {auth ? null : (
        <MenuItem
          sx={menuItemStyle}
          onClick={() => {
            navigate('/signup');
            handleMobileMenuClose();
          }}
        >
          Sign Up
        </MenuItem>
      )}
      {auth ? null : (
        <MenuItem sx={menuItemStyle} onClick={() => navigate('/login', { replace: true })}>
          Login
        </MenuItem>
      )}
      {auth ? (
        <MenuItem sx={menuItemStyle} onClick={handleLogoutUser}>
          Logout
        </MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <AppBar position="static" color="default" elevation={0} sx={appBarStyle}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={typographyStyle}>
          Welcome
        </Typography>
        <nav>
          <Link
            sx={navbarItemStyles}
            href="/"
            variant="button"
            underline="hover"
            color="textPrimary"
            onClick={() => navigate('/')}
          >
            About
          </Link>
          {auth ? (
            <Link
              sx={navbarItemStyles}
              href="/eat"
              variant="button"
              underline="hover"
              color="textPrimary"
              onClick={() => navigate('/eat')}
            >
              Let's eat
            </Link>
          ) : null}
          {auth ? (
            <Link sx={navbarItemStyles} href="/menu" variant="button" underline="hover" color="textPrimary">
              Menu
            </Link>
          ) : null}
          {auth ? null : (
            <Link sx={navbarItemStyles} href="/signup" variant="button" underline="hover" color="textPrimary">
              Sign up
            </Link>
          )}
        </nav>
        {auth ? null : (
          <Button sx={navbarItemStyles} color="primary" variant="outlined" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
        {auth ? (
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
