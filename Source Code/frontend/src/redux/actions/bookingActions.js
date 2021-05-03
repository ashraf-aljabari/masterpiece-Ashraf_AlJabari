import axios from 'axios';
import {
  BOOKINGS_LIST_MY_FAIL,
  BOOKINGS_LIST_MY_REQUEST,
  BOOKINGS_LIST_MY_SUCCESS,
  BOOKING_APPROVE_FAIL,
  BOOKING_APPROVE_REQUEST,
  BOOKING_APPROVE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  PLAYGROUND_BOOKINGS_LIST_FAIL,
  PLAYGROUND_BOOKINGS_LIST_REQUEST,
  PLAYGROUND_BOOKINGS_LIST_SUCCESS,
} from '../constants/bookingContants';

// Fetch all users playgrounds
export const listMyBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKINGS_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/bookings', config);

    dispatch({
      type: BOOKINGS_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKINGS_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// creating playground.
export const createBooking = (
  date,
  startTime,
  endTime,
  phoneNumber,
  ownerId,
  name,
  playgroundId
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/bookings`,
      { date, startTime, endTime, phoneNumber, ownerId, name, playgroundId },
      config
    );

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: message,
    });
  }
};

// listing single user complaints to show them in his profile page.
export const listMyPlaygroundBookings = ({ playgroundId }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PLAYGROUND_BOOKINGS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/bookings/playgroundbookings/${playgroundId}`,
      config
    );

    dispatch({
      type: PLAYGROUND_BOOKINGS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLAYGROUND_BOOKINGS_LIST_FAIL,
      payload: message,
    });
  }
};

// To let the admin update complaint status
export const updateBooking = ({ bookingId, approved }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKING_APPROVE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/bookings/approve/${bookingId}`,
      { approved },
      config
    );

    dispatch({
      type: BOOKING_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKING_APPROVE_FAIL,
      payload: message,
    });
  }
};
