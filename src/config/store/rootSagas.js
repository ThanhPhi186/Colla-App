import {all} from 'redux-saga/effects';
import {AuthenOverallRedux, CartRedux} from '../../redux';

export default function* watch() {
  yield all([
    AuthenOverallRedux.Sagas.AuthenOverallWatcher(),
    CartRedux.Sagas.CartWatcher(),
  ]);
}
