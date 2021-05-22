import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberProductCart: 0,
  listProductCart: [],
};

const cartReducer = createReducer(initialState, {
  [Actions.setNumberProductCart]: (state, action) => {
    state.numberProductCart += action.payload;
  },

  [Actions.setListProductCart]: (state, action) => {
    state.listProductCart = action.payload;
  },
});

export default cartReducer;
