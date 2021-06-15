import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const} from '../../utils';

import {addToCart, getCart} from './action';

function* getCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.Cart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getCart.success(response.data.data));
    } else {
      yield put(getCart.failed(response.error));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

function* createCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.Cart;
    const response = yield call(post, url, action.payload);
    if (response.ok) {
      yield put(addToCart.success(response.data));
    } else {
      yield put(addToCart.failed(response.error));
    }
  } catch (error) {}
}

export function* CartWatcher() {
  [yield takeEvery(addToCart.requestName, createCartAsync)];
  [yield takeEvery(getCart.requestName, getCartAsync)];
}
