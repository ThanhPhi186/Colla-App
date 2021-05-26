import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducer';
import sagas from './rootSagas';
import AsyncStorage from '@react-native-community/async-storage';
import {setToken} from '../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../redux';

const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  blacklist: [],
  debug: true,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

const handleAuthTokenMiddleware = store => next => action => {
  if (action.type === AuthenOverallRedux.Actions.LOGIN_SUCCESS) {
    setToken(action.payload.access_token);
  }
  next(action);
};
middleware.push(sagaMiddleware, handleAuthTokenMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

const persistConfig = {enhancers};

const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  const stateData = store.getState();

  if (stateData.AuthenOverallReducer.idToken) {
    setToken(stateData.AuthenOverallReducer.idToken);
  }
});

const configureStore = () => {
  return {persistor, store};
};
sagaMiddleware.run(sagas);
export default configureStore;
