import {createAction} from '@reduxjs/toolkit';

export const ADD_SALES_CART = 'ADD_SALES_CART';

const addSalesCart = createAction(ADD_SALES_CART);

export {addSalesCart};
