import IState from '../../types/IState';
import IEvent from '../../types/IEvent';

import { IEventsState } from './reducer';

export const getEvents = ({ events }: IState): IEventsState => events;

export const getEventsList = (state: IState): IEvent[] | null => getEvents(state).events;

export const getEventsIsLoading = (state: IState): boolean => getEvents(state).isLoading;
