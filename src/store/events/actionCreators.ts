import { EVENTS_REQUESTED, UPDATE_EVENT, CREATE_EVENT } from './sagas';

import { actionFactory } from '../utils';

import { SET_EVENTS, SET_CURRENT_EVENT, RESET_CURRENT_EVENT, IEventsState } from './reducer';

import IEvent from '../../types/IEvent';

export const updateEvents = (key: keyof IEventsState, events: IEvent[]) => actionFactory(SET_EVENTS, events);
export const setEvents = (events: IEvent[]) => updateEvents('list', events);

export const updateCurrentEvent = (key: keyof IEventsState, event: IEvent | null) => actionFactory(SET_CURRENT_EVENT, event);
export const setCurrentEvent = (event: IEvent | null) => updateCurrentEvent('currentEvent', event);
export const resetCurrentEvent = () => actionFactory(RESET_CURRENT_EVENT);

export const fetchEvents = () => actionFactory(EVENTS_REQUESTED);
export const updateEvent = () => actionFactory(UPDATE_EVENT);
export const createEvent = () => actionFactory(CREATE_EVENT);
