import {
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listMyBookings,
  listMyPlaygroundBookings,
  updateBooking,
} from '../redux/actions/bookingActions';
import { BOOKING_APPROVE_RESET } from '../redux/constants/bookingContants';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

// Material UI style
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BookingsPage = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const playgroundId = match.params.id;

  const myBookings = useSelector((state) => state.bookingListMy);
  const { loading, error, bookings } = myBookings;

  const playgroundBookings = useSelector(
    (state) => state.bookingPlaygroundList
  );
  const {
    loading: loadingBookings,
    error: loadingBookingsError,
    bookings: playgroundBookingsList,
  } = playgroundBookings;

  const bookingApprove = useSelector((state) => state.bookingApprove);
  const { loading: approveLoading, error: approveError } = bookingApprove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isOwner) {
        console.log(playgroundId);
        dispatch(listMyPlaygroundBookings({ playgroundId }));
      } else {
        dispatch(listMyBookings());
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      {userInfo &&
        (userInfo.isOwner ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>From</TableCell>
                  <TableCell align='center'>To</TableCell>
                  <TableCell align='center'>Phone Number</TableCell>
                  <TableCell align='center'>Approve</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playgroundBookingsList &&
                  playgroundBookingsList.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell component='th' scope='row'>
                        {booking.date.split('T')[0]}
                      </TableCell>
                      <TableCell align='center'>{booking.startTime}</TableCell>
                      <TableCell align='center'>{booking.endTime}</TableCell>
                      <TableCell align='center'>
                        {booking.phoneNumber}
                      </TableCell>
                      <TableCell align='center'>
                        {booking.approved ? (
                          <Button
                            color='primary'
                            variant='contained'
                            disabled={true}
                            style={{ width: '100%' }}
                          >
                            Approved
                          </Button>
                        ) : (
                          <Button
                            color='primary'
                            variant='contained'
                            // disabled={loading}
                            style={{ width: '100%' }}
                            onClick={() => {
                              const bookingId = booking._id;
                              const approved = true;
                              dispatch(updateBooking({ bookingId, approved }));
                              dispatch({ type: BOOKING_APPROVE_RESET });
                              dispatch(
                                listMyPlaygroundBookings({ playgroundId })
                              );
                            }}
                          >
                            {approveLoading ? (
                              <CircularProgress size={30} />
                            ) : (
                              'Approve'
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>From</TableCell>
                  <TableCell align='center'>To</TableCell>
                  <TableCell align='center'>Phone Number</TableCell>
                  <TableCell align='center'>Approve</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings &&
                  bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell component='th' scope='row'>
                        {booking.date.split('T')[0]}
                      </TableCell>
                      <TableCell align='center'>{booking.startTime}</TableCell>
                      <TableCell align='center'>{booking.endTime}</TableCell>
                      <TableCell align='center'>
                        {booking.phoneNumber}
                      </TableCell>
                      <TableCell align='center'>
                        {booking.approved ? (
                          <ThumbUpIcon style={{ color: 'green' }} />
                        ) : (
                          <ThumbDownIcon style={{ color: 'red' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
    </div>
  );
};

export default BookingsPage;
