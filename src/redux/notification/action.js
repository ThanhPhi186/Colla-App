import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const GET_COUNT_NOTI_UNREAD = 'GET_COUNT_NOTI_UNREAD';

const getCountNotiUnread = reduxHelper.generateActions(GET_COUNT_NOTI_UNREAD);

export {getCountNotiUnread};
