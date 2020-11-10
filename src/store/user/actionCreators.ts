import { USER_REQUESTED } from './sagas';

import { actionFactory } from '../utils';

import { UPDATE_USER_META, IUserState } from './reducer';

import IUserMeta from '@typing/IUserMeta';

export const updateUser = (key: keyof IUserState, value: IUserMeta) => actionFactory(UPDATE_USER_META, value);

export const setUserMeta = (value: IUserMeta) => updateUser('userMeta', value);

export const fetchUserAction = () => actionFactory(USER_REQUESTED);
