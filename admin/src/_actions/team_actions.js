import { SET_TEAMS, SET_ODDS } from './type';

export function set_teams(teams) {
  return {
    type: SET_TEAMS,
    payload: teams,
  };
}
export function set_Odds(odds) {
  return {
    type: SET_ODDS,
    payload: odds,
  };
}
