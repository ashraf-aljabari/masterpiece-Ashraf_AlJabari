import axios from 'axios';
import {
  COMPLAINT_CREATE_COMMENT_FAIL,
  COMPLAINT_CREATE_COMMENT_REQUEST,
  COMPLAINT_CREATE_COMMENT_SUCCESS,
  COMPLAINT_CREATE_FAIL,
  COMPLAINT_CREATE_REQUEST,
  COMPLAINT_CREATE_SUCCESS,
  COMPLAINT_DETAILS_FAIL,
  COMPLAINT_DETAILS_REQUEST,
  COMPLAINT_DETAILS_SUCCESS,
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_MY_FAIL,
  COMPLAINT_LIST_MY_REQUEST,
  COMPLAINT_LIST_MY_SUCCESS,
  COMPLAINT_LIST_REQUEST,
  COMPLAINT_LIST_SUCCESS,
  COMPLAINT_UPDATE_FAIL,
  COMPLAINT_UPDATE_REQUEST,
  COMPLAINT_UPDATE_SUCCESS,
} from '../constants/complaintsConstants';

// Redux actions

// Fetch all users complaints
export const listComplaints = () => async (dispatch) => {
  try {
    dispatch({ type: COMPLAINT_LIST_REQUEST });

    const { data } = await axios.get('/api/complaints');

    dispatch({
      type: COMPLAINT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// getting single complaint detail.
export const listComplaintDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPLAINT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/complaints/${id}`);

    dispatch({
      type: COMPLAINT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// creating complaint.
export const createComplaint = (complaint_text) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COMPLAINT_CREATE_REQUEST,
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
      `/api/complaints`,
      { complaint_text: complaint_text },
      config
    );

    dispatch({
      type: COMPLAINT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMPLAINT_CREATE_FAIL,
      payload: message,
    });
  }
};

// creating complaint comment.
export const createComplaintComment = (complaintId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COMPLAINT_CREATE_COMMENT_REQUEST,
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

    console.log(complaintId, comment);

    await axios.post(
      `http://localhost:5000/api/complaints/${complaintId}/comments`,
      { comment },
      config
    );

    dispatch({
      type: COMPLAINT_CREATE_COMMENT_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMPLAINT_CREATE_COMMENT_FAIL,
      payload: message,
    });
  }
};

// listing single user complaints to show them in his profile page.
export const listMyComplaints = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPLAINT_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/complaints/mycomplaints', config);

    dispatch({
      type: COMPLAINT_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMPLAINT_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// To let the admin update complaint status
export const updateComplaint = (complaint_status, complaint_id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COMPLAINT_UPDATE_REQUEST,
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
      `/api/complaints/${complaint_id}`,
      { status: complaint_status },
      config
    );

    dispatch({
      type: COMPLAINT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMPLAINT_UPDATE_FAIL,
      payload: message,
    });
  }
};
