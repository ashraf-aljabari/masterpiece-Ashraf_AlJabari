import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Modal,
  Fade,
  TextField,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react';
import moment from 'moment';
import { createBooking } from '../redux/actions/bookingActions';
import { BOOKING_CREATE_RESET } from '../redux/constants/bookingContants';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// import { DateRangePicker } from 'react-dates';
// import { START_DATE, END_DATE } from 'react-dates/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: '0.8rem',
  },
  media: {
    objectFit: '100% 100%',
    paddingTop: '70.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  closeModal: {
    color: 'red',
    position: 'absolute',
    right: '15px',
  },
  paper: {
    position: 'absolute',
    width: '20%',
    height: '68%',
    backgroundColor: 'white',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    marginTop: '1rem',
  },
}));

const PlaygroundCard = ({ playground }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setPhoneNumber('');
    setOpen(false);
  };

  const submitHandler = async () => {
    setSubmitLoading(true);
    dispatch(
      createBooking(
        date,
        startTime,
        endTime,
        phoneNumber,
        playground.ownerId,
        playground.name,
        playground._id
      )
    );

    dispatch({ type: BOOKING_CREATE_RESET });
    // dispatch(listMyPlaygrounds());
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton
              className={classes.closeModal}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <Grid container className={classes.modalContentContainer}>
              <Grid item sm />
              <Grid item sm>
                <Typography style={{ marginTop: '1rem' }}>Pick Date</Typography>
                <TextField
                  id='date'
                  name='date'
                  type='date'
                  placeholder='Date'
                  start
                  className={classes.textField}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                />
                <Typography style={{ marginTop: '1rem' }}>
                  Start Time
                </Typography>
                <TextField
                  id='startTime'
                  name='startTime'
                  type='time'
                  placeholder='Start Time'
                  className={classes.textField}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  fullWidth
                />
                <Typography style={{ marginTop: '1rem' }}>End Time</Typography>
                <TextField
                  id='endTime'
                  name='endTime'
                  type='time'
                  placeholder='End Time'
                  className={classes.textField}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  fullWidth
                />
                <TextField
                  id='phoneNumber'
                  name='phoneNumber'
                  type='text'
                  label='Phone Number'
                  className={classes.textField}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
                <div className={classes.buttonContainer}>
                  <Button
                    color='primary'
                    variant='contained'
                    // disabled={loading}
                    style={{ marginTop: '0.8rem', width: '100%' }}
                    onClick={() => submitHandler()}
                  >
                    {submitLoading ? <CircularProgress size={30} /> : 'Submit'}
                  </Button>
                </div>
              </Grid>
              <Grid item sm />
            </Grid>
          </div>
        </Fade>
      </Modal>
      <Card className={classes.root}>
        {userInfo &&
          (userInfo._id === playground.ownerId ? (
            ''
          ) : (
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader='September 14, 2016'
            />
          ))}
        <CardMedia
          className={classes.media}
          image={`http://127.0.0.1:5000/api/images/${playground.playgroundImage}`}
          title={playground.name}
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            <b>Playground Name:</b> {playground.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <b>Capacity:</b> {playground.capacity}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <b>Location:</b> {playground.location}
          </Typography>
          {/* <Typography
            variant='body2'
            color='textSecondary'
            component='p'
          ></Typography> */}
          {userInfo &&
            (userInfo._id === playground.ownerId ? (
              playground.approved ? (
                <Alert style={{ marginTop: '0.5rem' }} severity='success'>
                  Approved
                </Alert>
              ) : (
                <Alert style={{ marginTop: '0.5rem' }} severity='error'>
                  Not Approved yet
                </Alert>
              )
            ) : (
              ''
            ))}
        </CardContent>
        <CardActions disableSpacing>
          {userInfo ? (
            userInfo._id === playground.ownerId ? (
              <Button
                color='primary'
                variant='contained'
                style={{ width: '100%' }}
                component={Link}
                to={`/bookings/${playground._id}`}
              >
                View Bookings
              </Button>
            ) : (
              <Button
                color='primary'
                variant='contained'
                style={{ width: '100%' }}
                onClick={() => handleOpen()}
              >
                Book
              </Button>
            )
          ) : (
            <Button disabled={true} style={{ width: '100%' }}>
              Login to book
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default PlaygroundCard;
