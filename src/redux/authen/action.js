import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

const PREFIX = 'AUTHEN/OVERALL';
export const LOGIN = PREFIX + '/LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_DOMAIN = 'GET_DOMAIN';
export const GET_LOCATION = 'GET_LOCATION';
export const GET_ACCOUNT = 'GET_ACCOUNT';
export const RESET_COMPANY = 'RESET_COMPANY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_TOKEN = 'SET_TOKEN';
export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_POINT = 'UPDATE_POINT';

const login = reduxHelper.generateActions(LOGIN);
const logout = reduxHelper.generateActions(LOGOUT);
const getDomain = reduxHelper.generateActions(GET_DOMAIN);
const getProfile = reduxHelper.generateActions(GET_PROFILE);
const updatePoint = reduxHelper.generateActions(UPDATE_POINT);
const getLocation = createAction(GET_LOCATION);
const getAccount = createAction(GET_ACCOUNT);
const resetCompany = createAction(RESET_COMPANY);
const loginSuccess = createAction(LOGIN_SUCCESS);
const setToken = createAction(SET_TOKEN);

export {
  login,
  logout,
  getDomain,
  getLocation,
  getAccount,
  resetCompany,
  loginSuccess,
  setToken,
  getProfile,
  updatePoint,
};
