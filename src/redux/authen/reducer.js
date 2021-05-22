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
  //getDomain
  [Actions.getDomain.request]: (state, action) => {
    state.errorMessage = '';
    state.type = action.type;
  },
  [Actions.getDomain.success]: (state, action) => {
    state.domain = `https://${action.payload}/bod-apis/control`;
    state.errorMessage = '';
    state.type = action.type;
  },
  [Actions.getDomain.failed]: (state, action) => {
    state.errorMessage = action.payload;
    state.type = action.type;
  },

  //login
  // [Actions.login.request]: (state, action) => {
  //   state.loading = true;
  //   state.errorMessage = '';
  // },
  // [Actions.login.success]: (state, action) => {
  //   state.loading = false;
  //   state.userAuthen = action.payload;
  //   state.errorMessage = '';
  // },
  // [Actions.login.failed]: (state, action) => {
  //   state.loading = false;
  //   state.userAuthen = initialState;
  //   state.errorMessage = action.payload;
  // },

  [Actions.loginSuccess]: (state, action) => {
    state.loading = false;
    state.userAuthen = action.payload;
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
