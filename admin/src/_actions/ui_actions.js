import { SWITCH_SIDEBAR, SWITCH_VIEW, CHANGE_STYLE } from './type';

export function switch_sidebar(view) {
  return {
    type: SWITCH_SIDEBAR,
    payload: view,
  };
}

export function switch_view(filter) {
  return {
    type: SWITCH_VIEW,
    payload: filter,
  };
}

export function save_style(data) {
  return {
    type: CHANGE_STYLE,
    payload: data,
  };
}
