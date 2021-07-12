import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const} from '../../utils';

import {
  getCart,
  getImportCart,
  getOnlineCart,
  getPurchaseCart,
  getSalesCart,
} from './action';

function* getPurchaseCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.Cart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getPurchaseCart.success(response.data.data));
    } else {
      yield put(getPurchaseCart.failed(response.error));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

function* getImportCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.ImportCart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getImportCart.success(response.data.data));
    } else {
      yield put(getImportCart.failed(response.error));
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
  [yield takeEvery(getPurchaseCart.requestName, getPurchaseCartAsync)];
  [yield takeEvery(getImportCart.requestName, getImportCartAsync)];
  [yield takeEvery(getOnlineCart.requestName, getOnlineCartAsync)];
}
