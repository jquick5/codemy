import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  alertReducer,
  authReducer,
  courseReducer,
});
