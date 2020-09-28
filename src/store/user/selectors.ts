import { createSelector } from 'reselect';

import IState from '../../types/IState';
import IUserMeta from '../../types/IUserMeta';

import { IUserState } from './reducer';

const getUser = ({ user }: IState): IUserState => user;

export const getUserMeta = (state: IState): IUserMeta | null => getUser(state).userMeta;

export const getUserIsLoading = (state: IState): boolean => getUser(state).isLoading;

export const getUserUid = createSelector(
  getUserMeta,
  (userMeta: IUserMeta | null): string => userMeta && userMeta.uid || '',
);
