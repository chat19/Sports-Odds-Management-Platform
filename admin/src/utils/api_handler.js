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

const saveColors2 = data => {
  return $.post(`/saveColors2`, data);
};

const saveFonts2 = data => {
  return $.post(`/saveFonts2`, data);
};

export const api = {
  getTeams,
  saveTeams,
  saveColors,
  saveFonts,
  saveColors2,
  saveFonts2,
};
