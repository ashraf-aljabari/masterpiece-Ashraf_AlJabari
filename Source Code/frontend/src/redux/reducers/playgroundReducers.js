import {
  PLAYGROUND_APPROVE_FAIL,
  PLAYGROUND_APPROVE_REQUEST,
  PLAYGROUND_APPROVE_RESET,
  PLAYGROUND_APPROVE_SUCCESS,
  PLAYGROUND_CREATE_FAIL,
  PLAYGROUND_CREATE_REQUEST,
  PLAYGROUND_CREATE_RESET,
  PLAYGROUND_CREATE_SUCCESS,
  PLAYGROUND_LIST_FAIL,
  PLAYGROUND_LIST_MY_FAIL,
  PLAYGROUND_LIST_MY_REQUEST,
  PLAYGROUND_LIST_MY_RESET,
  PLAYGROUND_LIST_MY_SUCCESS,
  PLAYGROUND_LIST_REQUEST,
  PLAYGROUND_LIST_SUCCESS,
} from '../constants/playgroundConstants';

export const playgroundListReducer = (state = { playgrounds: [] }, action) => {
  switch (action.type) {
    case PLAYGROUND_LIST_REQUEST:
      return { loading: true, playgrounds: [] };
    case PLAYGROUND_LIST_SUCCESS:
      return {
        loading: false,
        playgrounds: action.payload,
      };
    case PLAYGROUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const playgroundCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYGROUND_CREATE_REQUEST:
      return { loading: true };
    case PLAYGROUND_CREATE_SUCCESS:
      return { loading: false, success: true, playground: action.payload };
    case PLAYGROUND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PLAYGROUND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const playgroundListMyReducer = (
  state = { playgrounds: [] },
  action
) => {
  switch (action.type) {
    case PLAYGROUND_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case PLAYGROUND_LIST_MY_SUCCESS:
      return {
        loading: false,
        playgrounds: action.payload,
      };
    case PLAYGROUND_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PLAYGROUND_LIST_MY_RESET:
      return { playgrounds: [] };
    default:
      return state;
  }
};

export const playgroundApproveReducer = (
  state = { playground: {} },
  action
) => {
  switch (action.type) {
    case PLAYGROUND_APPROVE_REQUEST:
      return { loading: true };
    case PLAYGROUND_APPROVE_SUCCESS:
      return { loading: false, success: true, playground: action.payload };
    case PLAYGROUND_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case PLAYGROUND_APPROVE_RESET:
      return { playground: {} };
    default:
      return state;
  }
};
