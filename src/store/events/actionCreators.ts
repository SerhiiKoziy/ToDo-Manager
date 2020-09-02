import { EVENTS_REQUESTED } from './sagas';

import { actionFactory } from '../utils';

import { UPDATE_EVENT, SET_EVENTS, IEventsState } from './reducer';

export const updateEvents = (key: keyof IEventsState, value: any) => actionFactory(SET_EVENTS, value);

export const setEvents = (value: any): any => updateEvents('events', value);

export const fetchEventsAction = () => actionFactory(EVENTS_REQUESTED);
