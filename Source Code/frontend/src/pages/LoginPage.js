import React, { useState, useEffect } from 'react';
// Logo
import AppLogo from '../images/logo.png';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
// Material UI Imports
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// React router dom
import { Link } from 'react-router-dom';

// Material UI style
const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '0',
    padding: '0',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
    fontWeight: 'bold',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
}));

// logging both the users and the admins in.

const LoginPage = ({ location, history }) => {
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  var phoneNumberRegEx = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(phoneNumber, password));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={AppLogo}
          alt='app logo'
          width='100'
          className={classes.image}
        />
        <Typography variant='h4' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id='phonenumber'
            name='phoneNumber'
            type='tel'
            label='Phone Number'
            className={classes.textField}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (phoneNumberRegEx.test(e.target.value)) {
                setPhoneError(false);
              } else {
                setPhoneError(true);
              }
            }}
            error={phoneError}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <Alert severity='error'>{error}</Alert>}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <small>
          Don't have an account ? sign up{' '}
          <Link to='/signup'>
            <b>here</b>
          </Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default LoginPage;
