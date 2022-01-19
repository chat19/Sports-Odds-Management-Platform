import $ from './http';

const getTeams = (type, view = 'all') => {
  return $.get(`/getTeams?type=${type}&view=${view}`);
};

const getLeagues = (type) => {
  return $.get(`/getLeagues?type=${type}`);
};

const getUsers = () => {
  return $.get(`/getUsers`);
};

const getSettings = () => {
  return $.get(`/getSettings`);
};

const getSettings2 = () => {
  return $.get(`/getSettings2`);
};

const saveTeams = data => {
  return $.post(`/saveTeams`, data);
};

const saveLeagues = data => {
  return $.post(`/saveLeagues`, data);
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

const addAccount = data => {
  return $.post(`/addAccount`, data);
};

const login = data => {
  return $.post(`/login`, data);
};

const deleteAccount = data => {
  return $.post(`/deleteAccount`, data);
};

const updateAccount = data => {
  return $.post(`/updateAccount`, data);
};

export const api = {
  getTeams,
  saveTeams,
  saveLeagues,
  saveColors,
  saveFonts,
  saveColors2,
  saveFonts2,
  addAccount,
  login,
  getUsers,
  deleteAccount,
  updateAccount,
  getSettings,
  getSettings2,
  getLeagues,

};
