import IState from '../../types/IState';
import IEvent from '../../types/IEvent';

import { IEventsState } from './reducer';

export const getEvents = ({ events }: IState): IEventsState => events;

export const getEventsList = (state: IState): IEvent[] => getEvents(state).list;
export const getCurrentEvent = (state: IState): IEvent | null => getEvents(state).currentEvent;
export const getEventsIsLoading = (state: IState): boolean => getEvents(state).isLoading;
