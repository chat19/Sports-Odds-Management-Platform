import { LOGIN_USER, REGISTER_USER, UPDATE_USER, LOGOUT_USER, AUTH_USER } from '../_actions/type';
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case REGISTER_USER:
      return { ...state, ...action.payload };
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case AUTH_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
