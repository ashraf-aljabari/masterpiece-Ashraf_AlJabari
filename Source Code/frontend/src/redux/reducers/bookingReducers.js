import {
  BOOKINGS_LIST_MY_FAIL,
  BOOKINGS_LIST_MY_REQUEST,
  BOOKINGS_LIST_MY_RESET,
  BOOKINGS_LIST_MY_SUCCESS,
  BOOKING_APPROVE_FAIL,
  BOOKING_APPROVE_REQUEST,
  BOOKING_APPROVE_RESET,
  BOOKING_APPROVE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_RESET,
  BOOKING_CREATE_SUCCESS,
  PLAYGROUND_BOOKINGS_LIST_FAIL,
  PLAYGROUND_BOOKINGS_LIST_REQUEST,
  PLAYGROUND_BOOKINGS_LIST_SUCCESS,
} from '../constants/bookingContants';

export const bookingPlaygroundListReducer = (
  state = { bookings: [] },
  action
) => {
  switch (action.type) {
    case PLAYGROUND_BOOKINGS_LIST_REQUEST:
      return { loading: true, bookings: [] };
    case PLAYGROUND_BOOKINGS_LIST_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case PLAYGROUND_BOOKINGS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { loading: true };
    case BOOKING_CREATE_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingListMyReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKINGS_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case BOOKINGS_LIST_MY_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case BOOKINGS_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKINGS_LIST_MY_RESET:
      return { bookings: [] };
    default:
      return state;
  }
};

export const bookingApproveReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_APPROVE_REQUEST:
      return { loading: true };
    case BOOKING_APPROVE_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_APPROVE_RESET:
      return { booking: {} };
    default:
      return state;
  }
};
