import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';
import {generateActions} from '../../helpers/reduxHelpers';

export const NUMBER_PRODUCT_CART = 'NUMBER_PRODUCT_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_TO_CART = 'REMOVE_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const GET_CART = 'GET_CART';

const addToCart = reduxHelper.generateActions(ADD_TO_CART);
const getCart = reduxHelper.generateActions(GET_CART);
const removeToCart = createAction(REMOVE_TO_CART);
const emptyCart = createAction(EMPTY_CART);

export {addToCart, removeToCart, emptyCart, getCart};
