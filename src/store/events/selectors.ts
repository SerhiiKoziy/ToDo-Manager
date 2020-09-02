import IState from '../../types/IState';
import IUserMeta from '../../types/IUserMeta';

import { IEventsState } from './reducer';

const getEvents = ({ events }: IState): IEventsState => events;

// export const getUserMeta = (state: IState): IUserMeta | null => getUser(state).userMeta;

// export const getUserIsLoading= (state: IState): boolean => getUser(state).isLoading;
