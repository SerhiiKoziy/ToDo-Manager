import { FETCH_USER } from './sagas';

import { actionFactory } from '../utils';

import { UPDATE_EVENT, SET_EVENTS, IUserState } from './reducer';

export const setEvents = (key: keyof IUserState, value: any) => actionFactory(SET_EVENTS, value);

export const setUserMeta = (value: any) => setEvents('events', value);

export const fetchUserAction = () => actionFactory(FETCH_USER);
