import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
  appBar: {
    fontFamily: 'Nunito',
  },
  backgroundColor: {
    background: 'none',
  },
  appBarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appBarTitle: {
    flexGrow: '1',
  },
  appBarTitleSpanStyle: {
    background: 'white',
    color: '#005605',
    borderRadius: '1rem',
    padding: '0.5rem',
    boxShadow: '5px 5px 20px -5px #2C2C2C',
  },
  subName: {
    color: '#E02A23',
  },
  icon: {
    color: '#333',
    fontSize: '2rem',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatarStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  //   logo: {
  //     backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/logo.jpg'})`,
  //     width: '100%',
  //     height: '100px',
  //     borderRadius: '2rem',
  //     backgroundSize: 'cover',
  //     boxShadow: '5px 5px 20px -5px #2C2C2C',
  //   },
}));

const Header = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    // setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider /> */}
      <List>
        <ListItem
          className={classes.avatarStyle}
          button
          component={Link}
          to='/profile'
        >
          <Avatar className={classes.large}>{userInfo.name.charAt(0)}</Avatar>
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/profile'>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
        {userInfo.isOwner ? (
          ''
        ) : (
          <ListItem button component={Link} to='/bookings'>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary='Booked Games' />
          </ListItem>
        )}
        {userInfo.isOwner ? (
          ''
        ) : (
          <ListItem button component={Link} to='/teams'>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='Teams' />
          </ListItem>
        )}
        <Divider />
        <ListItem button onClick={() => logoutHandler()}>
          <ListItemIcon>
            <ExitToAppIcon style={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} id='header'>
        <Toolbar className={classes.appBarWrapper}>
          <div className={classes.appBarTitle}>
            <Link to='/'>
              <h2>
                <span className={classes.appBarTitleSpanStyle}>Mal3abak</span>
              </h2>
            </Link>
          </div>
          {!userInfo ? (
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          ) : (
            <React.Fragment>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
              <IconButton
                style={{
                  background: '#fff',
                  boxShadow: '5px 5px 20px -5px #2C2C2C',
                }}
                onClick={toggleDrawer('right', true)}
              >
                <SortIcon className={classes.icon} />
              </IconButton>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
