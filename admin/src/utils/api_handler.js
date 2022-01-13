import $ from './http';

const getTeams = params => {
  return $.get(`/getTeams?type=${params}`);
};

const saveTeams = data => {
  return $.post(`/saveTeams`, data);
};

const saveColors = data => {
  return $.post(`/saveColors`, data);
};

const saveFonts = data => {
  return $.post(`/saveFonts`, data);
};

export const api = {
  getTeams,
  saveTeams,
  saveColors,
  saveFonts,
};
