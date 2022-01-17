import { SET_TEAMS, SET_ODDS } from '../_actions/type';
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case SET_ODDS:
      return {
        ...state,
        odds: action.payload,
      };
    default:
      return state;
  }
}
