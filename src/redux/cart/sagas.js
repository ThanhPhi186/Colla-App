import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const, trans} from '../../utils';

import {addToCart, getCart, getDomain, login, logout} from './action';

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
  } catch (error) {
    // yield put(login.failed(error));
  }
}

// function* loginAsync(action) {
//   try {
//     const baseURL = yield select(getBaseUrl);

//     const url = baseURL + Const.API.Login;
//     const response = yield call(post, url, action.payload);
//     if (response.data._ERROR_MESSAGE_) {
//       yield put(login.failed(response.data._ERROR_MESSAGE_));
//     } else {
//       yield put(login.success(response.data));
//     }
//   } catch (error) {
//     yield put(login.failed(error));
//   }
// }

// function* logoutAsync(action) {
//   try {
//     const baseURL = yield select(getBaseUrl);

//     const url = baseURL + Const.API.Logout;
//     const response = yield call(post, url, action.payload);
//     if (response.ok) {
//       yield put(logout.success(response.data));
//     } else {
//       yield put(logout.failed(response.error));
//     }
//   } catch (error) {
//     yield put(logout.failed(error));
//   }
// }
export function* CartWatcher() {
  [yield takeEvery(addToCart.requestName, createCartAsync)];
  [yield takeEvery(getCart.requestName, getCartAsync)];
  //   [yield takeEvery(getDomain.requestName, getDomainAsync)];
}
