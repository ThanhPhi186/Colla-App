import {
  AuthenOverallRedux,
  CartRedux,
  AppConfigRedux,
  NotificationRedux,
} from '../../redux';

const reducerMap = {
  AuthenOverallReducer: AuthenOverallRedux.Reducer,
  CartReducer: CartRedux.Reducer,
  AppConfigReducer: AppConfigRedux.Reducer,
  NotificationReducer: NotificationRedux.Reducer,
};

export default reducerMap;
