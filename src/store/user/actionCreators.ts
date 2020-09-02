// import IProduct from '^main-flow/types/IProduct';

// import * as actionTypes from "../actions/actionTypes";

import { FETCH_USER } from './sagas';

import TValueOf from '../../types/TValueOf';
import { actionFactory } from '../utils';

// import actions, { IUserState } from './reducer';
import { UPDATE_USER_META, IUserState } from './reducer';

// const { UPDATE_USER_META } = actions;

// export const updateUser = (key: keyof IUserState, value: any) => UPDATE_USER_META({ key, value });
export const updateUser = (key: keyof IUserState, value: any) => actionFactory(UPDATE_USER_META, value);

export const setUserMeta = (value: any) => updateUser('userMeta', value);

export const fetchUserAction = () => actionFactory(FETCH_USER);
