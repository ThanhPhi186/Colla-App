import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberProductCart: 0,
  listProductCart: [],
};

const cartReducer = createReducer(initialState, {
  [Actions.addToCart.success]: (state, action) => {
    // if (state.listProductCart.map(elm => elm.id).includes(action.payload.id)) {
    //   state.listProductCart = [...state.listProductCart].map(elm => {
    //     if (elm.id === action.payload.id) {
    //       elm.quantity += action.payload.quantity;
    //     }
    //     return elm;
    //   });
    // } else {
    //   state.listProductCart.push(action.payload);
    // }
  },
  [Actions.getCart.success]: (state, action) => {
    state.listProductCart = action.payload;
    state.numberProductCart = action.payload.length;
  },

  [Actions.removeToCart]: (state, action) => {
    state.listProductCart = [
      ...state.listProductCart.filter(elm => elm.id !== action.payload.id),
    ];
    state.numberProductCart = state.listProductCart.length;
  },

  [Actions.emptyCart]: (state, action) => {
    state.listProductCart = [];
    state.numberProductCart = 0;
  },
});

export default cartReducer;
