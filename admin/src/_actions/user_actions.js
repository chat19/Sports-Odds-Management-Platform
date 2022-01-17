import { api } from '../utils/api_handler';
import { LOGIN_USER, REGISTER_USER, UPDATE_USER, LOGOUT_USER, AUTH_USER } from './type';

export function loginUser(dataToSubmit) {
  const request = api
    .login(dataToSubmit)
    .then(res => res.data)
    .catch(e => e.data);
  return { type: LOGIN_USER, payload: request };
}

export function updateUser(dataToSubmit) {
  const request = api
    .update(dataToSubmit)
    .then(res => res.data)
    .catch(e => e.data);
  return { type: UPDATE_USER, payload: request };
}

export function logoutUser() {
  const request = api
    .logout()
    .then(res => res.data)
    .catch(e => e.data);
  return { type: LOGOUT_USER, payload: request };
}
