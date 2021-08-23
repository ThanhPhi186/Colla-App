import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';
import {Const, trans} from '../../utils';
import {getCountNotiUnread} from './action';

function* getCountNotiUnreadAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.NotiUnread;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getCountNotiUnread.success(response.data.data));
    } else {
      yield put(getCountNotiUnread.failed(response.error));
    }
  } catch (error) {
    yield put(getCountNotiUnread.failed(error));
  }
}

export function* NotificationWatcher() {
  [yield takeEvery(getCountNotiUnread.requestName, getCountNotiUnreadAsync)];
}
