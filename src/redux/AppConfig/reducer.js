import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  appConfig: {},
};

const appConfigReducer = createReducer(initialState, {
  [Actions.getAppConfig.success]: (state, action) => {
    state.appConfig = action.payload;
  },
});

export default appConfigReducer;
