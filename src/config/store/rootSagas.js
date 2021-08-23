import {all} from 'redux-saga/effects';
import {
  AuthenOverallRedux,
  CartRedux,
  AppConfigRedux,
  NotificationRedux,
} from '../../redux';

export default function* watch() {
  yield all([
    AuthenOverallRedux.Sagas.AuthenOverallWatcher(),
    CartRedux.Sagas.CartWatcher(),
    AppConfigRedux.Sagas.AppConfigWatcher(),
    NotificationRedux.Sagas.NotificationWatcher(),
  ]);
}
