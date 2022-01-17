import { combineReducers } from 'redux';
// import uiReducer from './ui_reducers';
// import teamReducer from './team_reducers';
import userReducer from './user_reducers';
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
