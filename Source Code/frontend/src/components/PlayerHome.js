import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

// Material UI style
const useStyles = makeStyles((theme) => ({
  btn: {
    width: '20%',
    paddingRight: '5rem',
    paddingLeft: '5rem',
    height: '150px',
    margin: '5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  root: {
    minHeight: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const PlayerHome = () => {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div className={classes.root}>
        <Button
          component={Link}
          to={'/allplaygrounds'}
          color='primary'
          variant='contained'
          className={classes.btn}
        >
          Book a playground
          <BookmarkIcon />
        </Button>
        <Button
          color='primary'
          disabled={userInfo ? false : true}
          variant='contained'
          className={classes.btn}
        >
          find a team
          <GroupIcon />
        </Button>
        <Button
          color='primary'
          disabled={userInfo ? false : true}
          variant='contained'
          className={classes.btn}
        >
          Call us
          <GroupIcon />
        </Button>
      </div>
      {!userInfo && (
        <Alert
          severity='info'
          style={{ width: '25%', margin: '0 auto 0 auto' }}
        >
          you need to be logged in to find a team
        </Alert>
      )}
    </div>
  );
};

export default PlayerHome;
