import { put, call, takeLatest } from "redux-saga/effects";

import {
  startFetching,
  stopFetching,
} from "../actions";

import { getAllEventsDatabase } from '../action-firebase/events';
import { setEvents } from './actionCreators';

import IEvent from '../../types/IEvent'

export const EVENTS_REQUESTED = "EVENTS_REQUESTED";

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
    const eventsList: IEvent[] = yield call(getEvents); //TODO add list interface

    const eventsArray = Object.values(eventsList);

    yield put(setEvents(eventsArray));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
}
