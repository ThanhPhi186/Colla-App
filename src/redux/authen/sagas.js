import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';
import {Const, trans} from '../../utils';

import {getDomain, login, logout} from './action';
const getBaseUrl = state => state.AuthenOverallReducer.domain;

function* getDomainAsync(action) {
  try {
    const url = Const.API.GetDomain;
    const response = yield call(get, url, action.payload);
    if (response.data.domain !== null) {
      yield put(getDomain.success(response.data.domain));
    } else {
      yield put(getDomain.failed(trans('companyCodeIncorrect')));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

function* loginAsync(action) {
  try {
    const baseURL = yield select(getBaseUrl);

    const url = baseURL + Const.API.Login;
    const response = yield call(post, url, action.payload);
    if (response.data._ERROR_MESSAGE_) {
      yield put(login.failed(response.data._ERROR_MESSAGE_));
    } else {
      yield put(login.success(response.data));
    }
  } catch (error) {
    yield put(login.failed(error));
  }
}

function* logoutAsync(action) {
  try {
    const baseURL = yield select(getBaseUrl);

    const url = baseURL + Const.API.Logout;
    const response = yield call(post, url, action.payload);
    if (response.ok) {
      yield put(logout.success(response.data));
    } else {
      yield put(logout.failed(response.error));
    }
  } catch (error) {
    yield put(logout.failed(error));
  }
}
export function* AuthenOverallWatcher() {
  [yield takeEvery(login.requestName, loginAsync)];
  [yield takeEvery(logout.requestName, logoutAsync)];
  [yield takeEvery(getDomain.requestName, getDomainAsync)];
}
