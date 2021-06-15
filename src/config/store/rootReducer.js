import {AuthenOverallRedux, CartRedux, SalesCartRedux} from '../../redux';

const reducerMap = {
  AuthenOverallReducer: AuthenOverallRedux.Reducer,
  CartReducer: CartRedux.Reducer,
  SalesCartReducer: SalesCartRedux.Reducer,
};

export default reducerMap;
