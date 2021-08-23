import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const GET_APP_CONFIG = 'GET_APP_CONFIG';

const getAppConfig = reduxHelper.generateActions(GET_APP_CONFIG);

export {getAppConfig};
