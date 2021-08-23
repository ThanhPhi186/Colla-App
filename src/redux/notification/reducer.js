import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  countNotiUnread: 0,
};

const notificationReducer = createReducer(initialState, {
  [Actions.getCountNotiUnread.success]: (state, action) => {
    state.countNotiUnread = action.payload.count;
  },
});

export default notificationReducer;
