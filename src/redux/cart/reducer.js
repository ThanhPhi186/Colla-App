import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberPurchaseCart: 0,
  listPurchaseCart: [],

  numberImportCart: 0,
  listImportCart: [],
  isVisibleModalTypeSales: false,
};

const cartReducer = createReducer(initialState, {
  // purchase cart
  [Actions.getPurchaseCart.success]: (state, action) => {
    state.listPurchaseCart = action.payload;
    state.numberPurchaseCart = action.payload.length;
  },

  [Actions.removePurchaseCart]: (state, action) => {
    state.listPurchaseCart = [
      ...state.listPurchaseCart.filter(elm => elm.id !== action.payload.id),
    ];
    state.numberPurchaseCart = state.listPurchaseCart.length;
  },

  // import cart

  [Actions.getImportCart.success]: (state, action) => {
    state.listImportCart = action.payload;
    state.numberImportCart = action.payload.length;
  },

  [Actions.removeImportCart]: (state, action) => {
    state.listImportCart = [
      ...state.listImportCart.filter(elm => elm.id !== action.payload.id),
    ];
    state.numberImportCart = state.listImportCart.length;
  },

  // change modal type sale
  [Actions.handelModalTypeSales]: (state, action) => {
    state.isVisibleModalTypeSales = action.payload;
  },
});

export default cartReducer;
