import { FETCH_USER } from './sagas';

import { actionFactory } from '../utils';

import { UPDATE_USER_META, IUserState } from './reducer';

// export const updateUser = (key: keyof IUserState, value: any) => UPDATE_USER_META({ key, value });
export const updateUser = (key: keyof IUserState, value: any) => actionFactory(UPDATE_USER_META, value);

export const setUserMeta = (value: any) => updateUser('userMeta', value);

export const fetchUserAction = () => actionFactory(FETCH_USER);
