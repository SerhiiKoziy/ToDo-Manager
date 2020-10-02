import { put, call, select, takeLatest } from "redux-saga/effects";
import { AnyAction } from 'redux';

import { startFetching, stopFetching } from "../actions";

import { getEventsFirebase, postEventFirebase } from '../action-firebase/events';
import { database } from "../action-firebase";

import { setEvents, setCurrentEvent } from './actionCreators';

import { getCurrentEvent } from './selectors';
import { getEventFormValues } from "../form/selectors";
import { getUserUid } from "../user/selectors";

import IEvent from '../../types/IEvent';

export const EVENTS_REQUESTED = "EVENTS_REQUESTED";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";

//TODO add to events
const getEventsFirebaseAction  = async () => {
  return await getEventsFirebase()
    .then((res: Promise<any>) => res)
    .catch((error) => {
      console.log('error', error)
    });
};

function* requestEventsAsync() {
  try {
    yield put(startFetching());

    const getEvents = () => getEventsFirebaseAction().then((events: IEvent[]) => events);
    const eventsList: IEvent[] = yield call(getEvents);

    const eventsArray = Object.values(eventsList);

    yield put(setEvents(eventsArray));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

const postEventFirebaseAction = async (event: IEvent): Promise<any> => await postEventFirebase(event);

function* createEventAsync() {
  yield put(startFetching());

  try {
    const event: IEvent = yield select(getEventFormValues);
    const uid: string = yield select(getUserUid);
    const preparedEvent: IEvent = {...event, uid: uid, stageProces: 'ToDo'};

    yield call(() => postEventFirebaseAction(preparedEvent));

    yield call(requestEventsAsync);

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
  eventId: string
}

function* updateEventAsync({ eventId }: IUpdateEventAsyncAction) {
  yield put(startFetching());

  try {
    const currentEvent: IEvent = yield select(getCurrentEvent);
    const formValues: IEvent = yield select(getEventFormValues);

    if (currentEvent) {
      const preparedEvent = {...currentEvent, ...formValues};
      const updateEvent = () => putEventFirebase(preparedEvent, currentEvent.eventId)
        .then((res: IEvent[]) => res);
      console.log('updateEvent', updateEvent);
      const eventRes: IEvent[] = yield call(updateEvent);

      console.log('eventRes', eventRes)
      // yield put(setEvent({}));
    }

    yield put(setCurrentEvent(null));
    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
  yield takeLatest(CREATE_EVENT, createEventAsync);
  yield takeLatest(UPDATE_EVENT, updateEventAsync);
}
