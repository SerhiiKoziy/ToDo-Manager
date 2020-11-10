import { createSelector } from 'reselect';

import IState from '@typing/IState';
import IUserMeta from '@typing/IUserMeta';

import { IUserState } from './reducer';

const getUser = ({ user }: IState): IUserState => user;

export const getUserMeta = (state: IState): IUserMeta | null => getUser(state).userMeta;

export const getUserIsLoading = (state: IState): boolean => getUser(state).isLoading;

export const getUserUid = createSelector(
  getUserMeta,
  (userMeta: IUserMeta | null): string => userMeta && userMeta.uid || '',
);

export const getIsUserLogin = createSelector(
  getUserMeta,
  (userMeta: IUserMeta | null): boolean => (userMeta && userMeta.uid && userMeta.uid.length > 0) || false,
);
