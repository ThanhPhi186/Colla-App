import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const} from '../../utils';

import {getCart, getSalesCart} from './action';

function* getCartAsync(action) {
  try {
    const url = `${Const.API.baseURL + Const.API.Cart}?type='import'`;
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
    const url = `${Const.API.baseURL + Const.API.Cart}?type='retail'`;
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

export function* CartWatcher() {
  [yield takeEvery(getCart.requestName, getCartAsync)];
  [yield takeEvery(getSalesCart.requestName, getSalesCartAsync)];
}
