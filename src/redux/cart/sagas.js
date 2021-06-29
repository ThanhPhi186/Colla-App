import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const} from '../../utils';

import {getCart, getOnlineCart, getSalesCart} from './action';

function* getCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.ImportCart;
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

function* getSalesCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.Cart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getSalesCart.success(response.data.data));
    } else {
      yield put(getSalesCart.failed(response.error));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

function* getOnlineCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.OnlineCart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getOnlineCart.success(response.data.data));
    } else {
      yield put(getOnlineCart.failed(response.error));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

export function* CartWatcher() {
  [yield takeEvery(getCart.requestName, getCartAsync)];
  [yield takeEvery(getSalesCart.requestName, getSalesCartAsync)];
  [yield takeEvery(getOnlineCart.requestName, getOnlineCartAsync)];
}
