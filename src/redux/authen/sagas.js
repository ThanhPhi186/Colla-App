import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';
import {Const, trans} from '../../utils';
import {getProfile} from './action';

function* getProfileAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.CheckAuth;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getProfile.success(response.data.data));
    } else {
      yield put(getProfile.failed(response.error));
    }
  } catch (error) {
    yield put(getProfile.failed(error));
  }
}

export function* AuthenOverallWatcher() {
  [yield takeEvery(getProfile.requestName, getProfileAsync)];
}
