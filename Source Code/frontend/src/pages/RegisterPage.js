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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
  },
}));

// customers can sing-up here to post there complaints
const SignupPage = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(false);
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  var phoneNumberRegEx = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );

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
    setMessage('');
    dispatch(register(name, phoneNumber, password, userType));
  };
  console.log(userType);

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
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value={false}>Player</MenuItem>
              <MenuItem value={true}>Owner</MenuItem>
            </Select>
          </FormControl>
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
