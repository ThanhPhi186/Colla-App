import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';
import {Const, trans} from '../../utils';
import {getAppConfig} from './action';

function* getAppConfigAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.Configs;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getAppConfig.success(response.data.data));
    } else {
      yield put(getAppConfig.failed(response.error));
    }
  } catch (error) {
    yield put(getAppConfig.failed(error));
  }
}

export function* AppConfigWatcher() {
  [yield takeEvery(getAppConfig.requestName, getAppConfigAsync)];
}
