import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// user reducers imports
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
} from './reducers/userReducers';
// complaints reducers imports
import {
  complaintCommentCreateReducer,
  complaintCreateReducer,
  complaintDetailsReducer,
  complaintListReducer,
  complaintListMyReducer,
  complaintUpdateReducer,
} from './reducers/complaintsReducers';
import {
  playgroundApproveReducer,
  playgroundCreateReducer,
  playgroundListMyReducer,
  playgroundListReducer,
} from './reducers/playgroundReducers';
import {
  bookingApproveReducer,
  bookingListMyReducer,
  bookingCreateReducer,
  bookingPlaygroundListReducer,
} from './reducers/bookingReducers';

// redux store (where all the state of the application is).

const reducer = combineReducers({
  bookingApprove: bookingApproveReducer,
  bookingListMy: bookingListMyReducer,
  bookingCreate: bookingCreateReducer,
  bookingPlaygroundList: bookingPlaygroundListReducer,
  playgroundList: playgroundListReducer,
  // complaintDetails: complaintDetailsReducer,
  playgroundCreate: playgroundCreateReducer,
  playgroundApprove: playgroundApproveReducer,
  // complaintCommentCreate: complaintCommentCreateReducer,
  playgroundListMy: playgroundListMyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
});

// getting logged in user from
// local storage and to put it in the initial
const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
