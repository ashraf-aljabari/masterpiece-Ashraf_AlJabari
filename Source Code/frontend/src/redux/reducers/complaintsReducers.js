import {
  COMPLAINT_CREATE_COMMENT_FAIL,
  COMPLAINT_CREATE_COMMENT_REQUEST,
  COMPLAINT_CREATE_COMMENT_RESET,
  COMPLAINT_CREATE_COMMENT_SUCCESS,
  COMPLAINT_CREATE_FAIL,
  COMPLAINT_CREATE_REQUEST,
  COMPLAINT_CREATE_RESET,
  COMPLAINT_CREATE_SUCCESS,
  COMPLAINT_DETAILS_FAIL,
  COMPLAINT_DETAILS_REQUEST,
  COMPLAINT_DETAILS_SUCCESS,
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_MY_FAIL,
  COMPLAINT_LIST_MY_REQUEST,
  COMPLAINT_LIST_MY_RESET,
  COMPLAINT_LIST_MY_SUCCESS,
  COMPLAINT_LIST_REQUEST,
  COMPLAINT_LIST_SUCCESS,
  COMPLAINT_UPDATE_FAIL,
  COMPLAINT_UPDATE_REQUEST,
  COMPLAINT_UPDATE_RESET,
  COMPLAINT_UPDATE_SUCCESS,
} from '../constants/complaintsConstants';

export const complaintListReducer = (state = { complaints: [] }, action) => {
  switch (action.type) {
    case COMPLAINT_LIST_REQUEST:
      return { loading: true, complaints: [] };
    case COMPLAINT_LIST_SUCCESS:
      return {
        loading: false,
        complaints: action.payload,
      };
    case COMPLAINT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const complaintDetailsReducer = (
  state = { complaint: { comments: [] } },
  action
) => {
  switch (action.type) {
    case COMPLAINT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMPLAINT_DETAILS_SUCCESS:
      return { loading: false, complaint: action.payload };
    case COMPLAINT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const complaintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLAINT_CREATE_REQUEST:
      return { loading: true };
    case COMPLAINT_CREATE_SUCCESS:
      return { loading: false, success: true, complaint: action.payload };
    case COMPLAINT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPLAINT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const complaintUpdateReducer = (state = { complaint: {} }, action) => {
  switch (action.type) {
    case COMPLAINT_UPDATE_REQUEST:
      return { loading: true };
    case COMPLAINT_UPDATE_SUCCESS:
      return { loading: false, success: true, complaint: action.payload };
    case COMPLAINT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPLAINT_UPDATE_RESET:
      return { complaint: {} };
    default:
      return state;
  }
};

export const complaintCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLAINT_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case COMPLAINT_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case COMPLAINT_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case COMPLAINT_CREATE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const complaintListMyReducer = (state = { complaints: [] }, action) => {
  switch (action.type) {
    case COMPLAINT_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case COMPLAINT_LIST_MY_SUCCESS:
      return {
        loading: false,
        complaints: action.payload,
      };
    case COMPLAINT_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPLAINT_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
