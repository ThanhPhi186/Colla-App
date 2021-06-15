import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberSalesCart: 0,
  listSalesCart: [],
};

const salesCartReducer = createReducer(initialState, {
  [Actions.addSalesCart]: (state, action) => {
    if (state.listSalesCart.map(elm => elm.id).includes(action.payload.id)) {
      state.listSalesCart = [...state.listSalesCart].map(elm => {
        if (elm.id === action.payload.id) {
          elm.amount += action.payload.amount;
        }
        return elm;
      });
    } else {
      state.listSalesCart.push(action.payload);
    }
    state.numberSalesCart = state.listSalesCart.length;
  },

  [Actions.removeToCart]: (state, action) => {
    state.listSalesCart = [
      ...state.listSalesCart.filter(elm => elm.id !== action.payload.id),
    ];
    state.numberProductCart = state.listSalesCart.length;
  },

  [Actions.emptyCart]: (state, action) => {
    state.listSalesCart = [];
    state.numberProductCart = 0;
  },
});

export default salesCartReducer;
