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

// redux store (where all the state of the application is).

const reducer = combineReducers({
  complaintList: complaintListReducer,
  complaintDetails: complaintDetailsReducer,
  complaintCreate: complaintCreateReducer,
  complaintUpdate: complaintUpdateReducer,
  complaintCommentCreate: complaintCommentCreateReducer,
  complaintListMy: complaintListMyReducer,
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
