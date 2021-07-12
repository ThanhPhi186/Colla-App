import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const NUMBER_PRODUCT_CART = 'NUMBER_PRODUCT_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_PURCHASE_CART = 'REMOVE_PURCHASE_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const GET_PURCHASE_CART = 'GET_PURCHASE_CART';
export const GET_IMPORT_CART = 'GET_IMPORT_CART';
export const REMOVE_IMPORT_CART = 'REMOVE_IMPORT_CART';
export const VISIBLE_MODAL_TYPE_SALES = 'VISIBLE_MODAL_TYPE_SALES';
export const GET_ONLINE_CART = 'GET_ONLINE_CART';
export const REMOVE_ONLINE_CART = 'REMOVE_ONLINE_CART';

const addToCart = reduxHelper.generateActions(ADD_TO_CART);

const getPurchaseCart = reduxHelper.generateActions(GET_PURCHASE_CART);

const removePurchaseCart = createAction(REMOVE_PURCHASE_CART);

const emptyCart = createAction(EMPTY_CART);

const getImportCart = reduxHelper.generateActions(GET_IMPORT_CART);

const getOnlineCart = reduxHelper.generateActions(GET_ONLINE_CART);

const removeImportCart = createAction(REMOVE_IMPORT_CART);

const removeOnlineCart = createAction(REMOVE_ONLINE_CART);

const handelModalTypeSales = createAction(VISIBLE_MODAL_TYPE_SALES);

export {
  addToCart,
  removePurchaseCart,
  emptyCart,
  getPurchaseCart,
  getImportCart,
  removeImportCart,
  handelModalTypeSales,
  getOnlineCart,
  removeOnlineCart,
};
