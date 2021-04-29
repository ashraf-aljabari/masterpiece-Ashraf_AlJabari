import React, { useState, useEffect } from 'react';
// Logo
import AppLogo from '../images/logo.png';
// redux
import { useDispatch, useSelector } from 'react-redux';
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
import { register } from '../redux/actions/userActions';
const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
    padding: '0',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
}));

// customers can sing-up here to post there complaints
const SignupPage = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      setMessage('');
      dispatch(register(name, email, password));
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={AppLogo}
          alt='app logo'
          width='150'
          className={classes.image}
        />
        <Typography variant='h2' className={classes.pageTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id='name'
            name='name'
            type='name'
            label='Name'
            className={classes.textField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            id='ConfirmPassword'
            name='ConfirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          {error && <Alert severity='error'>{error}</Alert>}
          {message && <Alert severity='error'>{message}</Alert>}
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
              'Sign up'
            )}
          </Button>
        </form>
        <small>
          Have an account ? Login{' '}
          <Link to='/login'>
            <b>here</b>
          </Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default SignupPage;
