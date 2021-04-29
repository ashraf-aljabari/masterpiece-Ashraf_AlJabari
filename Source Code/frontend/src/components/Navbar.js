import React from 'react';
// react router DOM Imports
import { Link } from 'react-router-dom';
// Material UI imports
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from '@material-ui/core';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openAdmin = Boolean(adminAnchorEl);

  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdminClose = () => {
    setAdminAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdminMenu = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setAnchorEl(null);
  };
  return (
    <nav className={classes.root}>
      <AppBar className={classes.root}>
        <Toolbar className='nav-container'>
          <Button
            color='inherit'
            className={classes.menuButton}
            component={Link}
            to='/'
          >
            Home
          </Button>
          <div style={{ width: '30vw' }} className={classes.title}></div>
          {userInfo && userInfo.isAdmin && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='admin-menu'
                aria-haspopup='true'
                onClick={handleAdminMenu}
                color='inherit'
              >
                <Typography>Admin</Typography>
              </IconButton>
              <Menu
                id='admin-menu'
                anchorEl={adminAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openAdmin}
                onClose={handleAdminClose}
              >
                <MenuItem
                  onClick={handleAdminClose}
                  component={Link}
                  to='/admin/complaints'
                >
                  Complaints
                </MenuItem>
                <MenuItem
                  onClick={handleAdminClose}
                  component={Link}
                  to='/admin/users'
                >
                  Users
                </MenuItem>
              </Menu>
            </div>
          )}
          {!userInfo ? (
            <div>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Sign up
              </Button>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <Avatar>{userInfo.name.charAt(0)}</Avatar>
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/profile'>
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler} component={Link}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
