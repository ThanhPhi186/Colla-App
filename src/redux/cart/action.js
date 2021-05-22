import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const NUMBER_PRODUCT_CART = 'NUMBER_PRODUCT_CART';
export const LIST_PRODUCT_CART = 'LIST_PRODUCT_CART';

const setNumberProductCart = createAction(NUMBER_PRODUCT_CART);
const setListProductCart = createAction(LIST_PRODUCT_CART);

export {setNumberProductCart, setListProductCart};
