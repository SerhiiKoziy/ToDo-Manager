import { EVENTS_REQUESTED, UPDATE_EVENT } from './sagas';

import { actionFactory } from '../utils';

import { SET_EVENTS, IEventsState } from './reducer';

import IEvent from '../../types/IEvent';

export const updateEvents = (key: keyof IEventsState, value: any) => actionFactory(SET_EVENTS, value);

export const setEvents = (value: IEvent[]): any => updateEvents('events', value);

export const fetchEventsAction = () => actionFactory(EVENTS_REQUESTED);

export const updateEvent = (event: IEvent) => actionFactory(UPDATE_EVENT, event);
