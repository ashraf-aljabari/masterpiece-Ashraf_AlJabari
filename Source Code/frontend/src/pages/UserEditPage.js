import React, { useEffect, useState } from 'react';
// Material UI Imports
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';
import { getUserDetails, updateUser } from '../redux/actions/userActions';

// Material UI style
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

// admins can edit users account modifying
// there names or emails or promote them to admins
const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant='h2' className={classes.pageTitle}>
          Edit User
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
          <Typography>
            Admin
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Typography>
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
              'Save'
            )}
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default UserEditPage;
