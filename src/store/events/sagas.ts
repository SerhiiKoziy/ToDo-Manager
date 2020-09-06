import { put, call, takeLatest } from "redux-saga/effects";
import { AnyAction } from 'redux';

import {
  startFetching,
  stopFetching,
} from "../actions";

import { getAllEventsDatabase } from '../action-firebase/events';
import { setEvents } from './actionCreators';

import IEvent from '../../types/IEvent';
import {database} from "../action-firebase";

export const EVENTS_REQUESTED = "EVENTS_REQUESTED";
export const UPDATE_EVENT = "UPDATE_EVENT";

//TODO add to events
const getEventsList = async () => {
  return await getAllEventsDatabase()
    .then((res: Promise<any>) => res)
    .catch((error) => {
      console.log('error', error)
    });
};

function* requestEventsAsync() {
  try {
    yield put(startFetching());

    const getEvents = () => getEventsList().then((events: IEvent[]) => events);
    const eventsList: IEvent[] = yield call(getEvents);

    const eventsArray = Object.values(eventsList);

    yield put(setEvents(eventsArray));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export async function putEventFirebase(event: IEvent, eventId: IEvent['eventId']) {
  try {
    return await database.ref(`events/${eventId}/`).update(event);
  } catch (err) {
    return Promise.reject(err);
  }
}

interface IUpdateEventAsyncAction extends AnyAction {
  payload: IEvent
}

function* updateEventAsync({ payload: event }: IUpdateEventAsyncAction) {
  try {
    yield put(startFetching());

    const updateEvent = () => putEventFirebase(event, event.eventId).then((res: IEvent[]) => res);
    console.log('updateEvent', updateEvent)
    const eventRes: IEvent[] = yield call(updateEvent);

    console.log('eventRes', eventRes)
    // yield put(setEvent({}));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
  yield takeLatest(UPDATE_EVENT, updateEventAsync);
}
