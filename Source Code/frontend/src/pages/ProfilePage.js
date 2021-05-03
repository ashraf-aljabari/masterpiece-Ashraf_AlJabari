import React, { useEffect, useState } from 'react';
// Material UI imports
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from '@material-ui/core';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUserProfile,
} from '../redux/actions/userActions';
import { listMyComplaints } from '../redux/actions/complaintActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';
import Alert from '@material-ui/lab/Alert';
import ComplaintCard from '../components/Complaint';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// Material UI style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '85vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel: {
    overflow: 'auto',
    width: '100%',
    // overflowX: 'hidden',
  },
  data: {
    // height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '3rem',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  formContainer: {
    padding: '1rem',
    width: '400px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// profile page the previews the user information and
// he can edit his information and view his complaints

const ProfilePage = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [edit, setEdit] = useState(true);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // const complaintListMy = useSelector((state) => state.complaintListMy);
  // const { loading: loadingComplaints, complaints } = complaintListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyComplaints());
      } else {
        setName(user.name);
        console.log(user);
        setEmail(user.phoneNumber);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <Avatar className={classes.large}>{name.charAt(0)}</Avatar>
        <Paper className={classes.formContainer}>
          <form noValidate onSubmit={submitHandler} className={classes.from}>
            <TextField
              id='name'
              name='name'
              type='name'
              label='Name'
              disabled={edit}
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
              disabled={edit}
              className={classes.textField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            {!edit && (
              <TextField
                id='password'
                name='password'
                type='password'
                label='Password'
                disabled={edit}
                className={classes.textField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            )}
            {!edit && (
              <TextField
                id='ConfirmPassword'
                name='ConfirmPassword'
                type='password'
                label='Confirm Password'
                disabled={edit}
                className={classes.textField}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            )}
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='error'>{message}</Alert>}
            <div className={classes.buttonsContainer}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                disabled={loading}
                onClick={() => setEdit(!edit)}
              >
                {loading ? (
                  <CircularProgress size={30} className={classes.progress} />
                ) : edit ? (
                  'Edit'
                ) : (
                  'cancel'
                )}
              </Button>
              {!edit && (
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
              )}
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ProfilePage;
