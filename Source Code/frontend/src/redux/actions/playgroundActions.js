import axios from 'axios';
import {
  PLAYGROUND_APPROVE_FAIL,
  PLAYGROUND_APPROVE_REQUEST,
  PLAYGROUND_APPROVE_SUCCESS,
  PLAYGROUND_CREATE_FAIL,
  PLAYGROUND_CREATE_REQUEST,
  PLAYGROUND_CREATE_SUCCESS,
  PLAYGROUND_LIST_FAIL,
  PLAYGROUND_LIST_MY_FAIL,
  PLAYGROUND_LIST_MY_REQUEST,
  PLAYGROUND_LIST_MY_SUCCESS,
  PLAYGROUND_LIST_REQUEST,
  PLAYGROUND_LIST_SUCCESS,
} from '../constants/playgroundConstants';

// Fetch all users playgrounds
export const listPlaygrounds = () => async (dispatch) => {
  try {
    dispatch({ type: PLAYGROUND_LIST_REQUEST });

    const { data } = await axios.get('/api/playgrounds');

    dispatch({
      type: PLAYGROUND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYGROUND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// creating playground.
export const createPlayground = (
  playgroundImage,
  name,
  capacity,
  location
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYGROUND_CREATE_REQUEST,
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
      `/api/playgrounds`,
      { playgroundImage, name, capacity, location },
      config
    );

    dispatch({
      type: PLAYGROUND_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLAYGROUND_CREATE_FAIL,
      payload: message,
    });
  }
};

// listing single user complaints to show them in his profile page.
export const listMyPlaygrounds = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYGROUND_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/playgrounds/myplaygrounds', config);

    dispatch({
      type: PLAYGROUND_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLAYGROUND_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// To let the admin update complaint status
export const updatePlayground = ({ approved, playgroundId }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PLAYGROUND_APPROVE_REQUEST,
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
      `/api/playgrounds/approve/${playgroundId}`,
      { approved },
      config
    );

    dispatch({
      type: PLAYGROUND_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLAYGROUND_APPROVE_FAIL,
      payload: message,
    });
  }
};
