import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  domain: '',
  userAuthen: {
    // accessToken: null,
    // refreshToken: null,
    // id: null,
  },
  location: null,
  errorMessage: '',
  loading: false,
  type: '',
  accountUser: null,
  idToken: '',
};

const overallReducer = createReducer(initialState, {
  [Actions.loginSuccess]: (state, action) => {
    state.loading = false;
    state.userAuthen = action.payload;
  },

  [Actions.getProfile.success]: (state, action) => {
    state.errorMessage = '';
    state.userAuthen = action.payload;
  },

  [Actions.updatePoint.success]: (state, action) => {
    state.errorMessage = '';
    if (state.userAuthen) {
      state.userAuthen.point = action.payload.point;
    }
  },

  [Actions.setToken]: (state, action) => {
    state.loading = false;
    state.idToken = action.payload;
  },

  //logout
  [Actions.logout.success]: (state, action) => {
    state.userAuthen = initialState;
    state.accountUser = null;
  },
});

export default overallReducer;
