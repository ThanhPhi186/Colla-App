import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberProductCart: 0,
  numberSalesCart: 0,
  listProductCart: [],
  listSalesCart: [],
  isVisibleModalTypeSales: false,
};

const cartReducer = createReducer(initialState, {
  // import cart
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

  // sales cart

  [Actions.getSalesCart.success]: (state, action) => {
    state.listSalesCart = action.payload;
    state.numberSalesCart = action.payload.length;
  },

  [Actions.removeSalesCart]: (state, action) => {
    state.listSalesCart = [
      ...state.listSalesCart.filter(elm => elm.id !== action.payload.id),
    ];
    state.numberSalesCart = state.listSalesCart.length;
  },

  // change modal type sale
  [Actions.handelModalTypeSales]: (state, action) => {
    state.isVisibleModalTypeSales = action.payload;
  },
});

export default cartReducer;
